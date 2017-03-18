/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/NotesActions'

import CoolPreloader from '../../preloader/CoolPreloader'

import UpdateNoteForm from '../forms/UpdateNoteForm'

import NoteAttachmentsPanels from '../attachments/panels/NoteAttachmentsPanels'

class UpdateNotePanel extends React.Component {

    static defaultProps = {
        noteId: undefined
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onChange = (content) => {
        let data = {
            id: this.props.noteId,
            content: content
        }
        return this.props.updateNote(data);
    }

    render = () => {
        let {loading, noteId, getNote} = this.props;
        let note = getNote(noteId);
        if (note == undefined){
            return null;
        }

        return (
            <div className={'update_note_panel'} >

                <div className={'update_form_placeholder'} >
                    <UpdateNoteForm onChange={this.onChange} content={note.content} buttonName={'Редактировать'} />
                </div>

                <div className={'update_attachments_placeholder'}>
                    <NoteAttachmentsPanels id={noteId} />
                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getNote = (state, id) => {
    let map = state.notes.notesMap;
    return map.get(id);
}

const mapStateToProps = (state) => {
   return {
       loading: state.notes.loading,
       getNote: (id) => {
           return getNote(state, id);
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       updateNote: (data) => {
           return dispatch(actions.updateNote(data))
       }
   }
}

UpdateNotePanel = connect(mapStateToProps, mapDispatchToProps)(UpdateNotePanel)

export default UpdateNotePanel