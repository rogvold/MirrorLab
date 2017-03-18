/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/NotesActions'

import CoolPreloader from '../../preloader/CoolPreloader'

import moment from 'moment';

import UpdateNotePanel from './UpdateNotePanel'
import CreateNotePanel from './CreateNotePanel'

import NoSessionsPanel from '../../placeholder/NoSessionsPanel'

import AttachmentsList from '../attachments/list/AttachmentsList'

class UserNotesPanel extends React.Component {

    static defaultProps = {
        selectedId: undefined,

        shouldShowCreateBlock: true

    }

    static propTypes = {
        getUserNotes: PropTypes.func.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUserNotes(this.props.userId);
    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {loading, getUserNotes, userId, shouldShowCreateBlock} = this.props;
        let notes = getUserNotes(userId);
        let {selectedId} = this.state;

        console.log('UserNotesPanel: render: notes = ', notes);

        return (
            <div className={'user_notes_panel'} >

                {shouldShowCreateBlock == false ? null :
                    <div className={'create_note_placeholder'} >
                        <CreateNotePanel userId={userId} />
                    </div>
                }

                {loading == false && notes.length == 0 ?
                    <NoSessionsPanel text={'У пользователя еще нет расшифровок электрокардиограмм.'} /> : null
                }

                <div className={'notes_list_placeholder'} >

                    {notes.map((note, k) => {
                        let key = 'note_' + k + '_' + note.id;
                        let isSelected = (selectedId == note.id);
                        let onClick = (isSelected == true) ? ()=>{} : ()=>{console.log('expanding!');this.setState({selectedId: note.id});}
                        return (
                            <div className={'note_item ' + (isSelected == true ? ' selected ' : '')}
                                 key={key}  >
                                <div className={'date_placeholder'} >
                                    <i className={'icon calendar'} ></i>
                                    {moment(note.timestamp).format('DD.MM.YYYY HH:mm')}
                                    <span style={{float: 'right'}} onClick={onClick} >
                                        <i className={'icon pencil'} ></i>
                                    </span>
                                </div>

                                {note.content == undefined ? null :
                                    <div className={'content'} >
                                        <div dangerouslySetInnerHTML={{__html: note.content.replace(/\n/g, '<br/>')}} ></div>
                                        <div>
                                            <AttachmentsList attachments={note.attachments} editMode={false} />
                                        </div>
                                    </div>
                                }

                                {isSelected == false ? null :
                                    <div className={'selected_content'} >
                                        <UpdateNotePanel noteId={note.id} />
                                    </div>
                                }

                            </div>
                        )
                    })}

                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getUserNotes_ = (state, userId) => {
    let arr = state.notes.notesMap.toList().toJS().sort((a, b) => {
        return (b.timestamp - a.timestamp)
    });
    arr = arr.filter((a) => {
        return (a.userId == userId);
    })
    return arr;
}

const mapStateToProps = (state) => {
   return {
       loading: state.notes.loading,
       getUserNotes: (userId) => {
           return getUserNotes_(state, userId);
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserNotes: (userId) => {
           return dispatch(actions.loadUserNotes(userId))
       }
   }
}

UserNotesPanel = connect(mapStateToProps, mapDispatchToProps)(UserNotesPanel)

export default UserNotesPanel