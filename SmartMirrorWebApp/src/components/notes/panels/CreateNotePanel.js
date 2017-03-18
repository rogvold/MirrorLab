/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/NotesActions'

import CoolPreloader from '../../preloader/CoolPreloader'

import UpdateNoteForm from '../forms/UpdateNoteForm'

class CreateNotePanel extends React.Component {

    static defaultProps = {
        userId: undefined
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

    onCreate = (content) => {
        let data = {
            userId: this.props.userId,
            content: content
        }
        return this.props.createNote(data);
    }

    render = () => {
        let {loading} = this.props;


        return (
            <div className={'update_note_panel'} >

                <div className={'update_form_placeholder'} >
                    <UpdateNoteForm onChange={this.onCreate} placeholder={'Новая расшифровка...'} buttonName={'Создать'} />
                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.notes.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: (data) => {
            return dispatch(actions.createNote(data))
        }
    }
}

CreateNotePanel = connect(mapStateToProps, mapDispatchToProps)(CreateNotePanel)

export default CreateNotePanel