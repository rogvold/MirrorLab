/**
 * Created by sabir on 02.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AttachmentsList from '../list/AttachmentsList'

import * as actions from '../../../../actions/NotesActions'

class NoteAttachmentsPanels extends React.Component {

    static defaultProps = {}

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

    onAttachmentRemove = (number) => {
        console.log('onAttachmentRemove: number = ', number);
        let {note, updateNote} = this.props;
        console.log('note = ', note);
        let {attachments} = note;
        console.log('attachments = ', attachments);

        let newAttachments = attachments.slice(0, number).concat(attachments.slice(number + 1));
        let data = Object.assign({}, note, {attachments: newAttachments});
        updateNote(data);
    }

    onAttachmentAdd = (url) => {
        let {note, updateNote} = this.props;
        let {attachments} = note;
        let attachment = {
            url: url,
            name: 'файл ' + (+attachments.length + 1)
        }
        console.log('onAttachmentAdd: url = ', url);
        console.log('attachments, attachment = ', attachments, attachment);

        attachments.push(attachment);
        let data = Object.assign({}, note, {attachments: attachments});
        updateNote(data);
    }

    render = () => {
        let {note} = this.props;
        if (note == undefined){
            return null;
        }
        console.log('NoteAttachmentsPanels: render: note = ', note);

        return (
            <div className={'note_attachments_panel'} >

                <div className={'attachments_list_placeholder'} >
                    <AttachmentsList attachments={note.attachments}
                                     onRemove={this.onAttachmentRemove}
                                     onAdd={this.onAttachmentAdd}
                    />
                </div>

            </div>
        )
    }

}

let getNote = (state, id) => {
    let {notesMap} = state.notes;
    if (id == undefined){
        return undefined;
    }
    return notesMap.get(id);
}


const mapStateToProps = (state, ownProps) => {
   return {
       loading: state.notes.loading,
       note: getNote(state, ownProps.id)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       updateNote: function(data){
           return dispatch(actions.updateNote(data))
       }
   }
}

NoteAttachmentsPanels = connect(mapStateToProps, mapDispatchToProps)(NoteAttachmentsPanels)

export default NoteAttachmentsPanels