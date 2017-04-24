/**
 * Created by sabir on 24.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as chatActions from '../../../redux/actions/ChatActions'

class ChatDaemon extends React.Component {

    static defaultProps = {
        dt: 5 * 1000
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadFresh, viewMessagesFromSelectedUser, dt} = this.props;
        console.log('ChatDaemon: componentDidMount occured');
        this.interval = setInterval(() => {
            console.log('loading fresh');
            loadFresh();
            this.viewSelectedUserMessages();
        }, dt);
    }

    viewSelectedUserMessages() {
        let {viewMessagesFromSelectedUser, selectedUserId, getNotReadMessagesNumber} = this.props;
        if (selectedUserId == undefined){
            return;
        }
        let n = getNotReadMessagesNumber(selectedUserId);
        if (n == 0){
            return;
        }
        viewMessagesFromSelectedUser();
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    componentWillReceiveProps() {

    }



    render = () => {

        return (
            <div style={{display: 'none'}} >

            </div>
        )
    }

}

let getNotReadFriendMessagesNumber = (state, friendId) => {
    let {messagesMap} = state.chat;
    let {currentUserId} = state.users;
    let messages = messagesMap.toArray().filter((m) => {return ((m.fromId == friendId) && (m.toId == currentUserId) && (m.viewed != true))})
    return messages.length;
}

const mapStateToProps = (state) => {
   return {
       selectedUserId: state.chat.selectedUserId,
       getNotReadMessagesNumber: uId => getNotReadFriendMessagesNumber(state, uId)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadFresh: () => {
           return dispatch(chatActions.loadUserMessages())
       },

       viewMessagesFromSelectedUser: () => {
           return dispatch(chatActions.viewMessagesFromSelectedUser())
       }

   }
}

ChatDaemon = connect(mapStateToProps, mapDispatchToProps)(ChatDaemon)

export default ChatDaemon