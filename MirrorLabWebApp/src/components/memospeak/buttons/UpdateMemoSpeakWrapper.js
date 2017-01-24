/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from '../../dialog/Dialog'

import UpdateMemoSpeakPanel from '../panels/UpdateMemoSpeakPanel'

class UpdateMemoSpeakWrapper extends React.Component {

    static defaultProps = {
        onUpdated: () => {

        },

        level: 100
    }

    static propTypes = {}

    state = {
        dialogVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onUpdated = () => {
        this.onClose();
        this.props.onUpdated();
    }

    getContent = () => {
        return (
            <UpdateMemoSpeakPanel onUpdated={this.onUpdated} />
        )
    }

    show = () => {
        console.log('show occured');
        this.setState({
            dialogVisible: true
        })
    }

    onClose = () => {
        this.setState({
            dialogVisible: false
        })
    }

    render = () => {
        let content = this.getContent();

        return (
            <div>

                <div onClick={this.show}>
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={content} level={this.props.level} onClose={this.onClose}
                            visible={true}
                    />
                }

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

//UpdateMemoSpeakWrapper = connect(mapStateToProps, mapDispatchToProps)(UpdateMemoSpeakWrapper)

export default UpdateMemoSpeakWrapper