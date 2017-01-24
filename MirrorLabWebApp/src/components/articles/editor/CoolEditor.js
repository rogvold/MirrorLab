/**
 * Created by sabir on 21.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import Editor from 'draft-js-editor'
import {
    Editor,
    createEditorState,
} from 'medium-draft';

import AddImageButton from './buttons/AddImageButton'

class CoolEditor extends React.Component {

    static defaultProps = {}

    static propTypes = {}



    state = {
        editorState: createEditorState()
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.sideButtons = [{
            title: 'Image',
            component: AddImageButton,
        }];
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }



    render = () => {
        const {editorState} = this.state;

        return (
            <div className={'patient_editor'} >
                <Editor
                    onChange={(editorState) => this.setState({ editorState })}
                    editorState={editorState}
                    sideButtons={this.sideButtons}
                />

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//CoolEditor = connect(mapStateToProps, mapDispatchToProps)(CoolEditor)

export default CoolEditor