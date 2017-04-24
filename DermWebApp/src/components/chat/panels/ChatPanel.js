/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ChatUsersList from '../list/ChatUsersList'

import * as chatActions from '../../../redux/actions/ChatActions'

import ChatUserPanel from './ChatUserPanel'

import TabbedUserInfoPanel from '../../info/panels/TabbedUserInfoPanel'

class ChatPanel extends React.Component {

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

    onUserSelect = (u) => {

    }

    render = () => {
        let {selectedUserId, users, selectUser, user} = this.props;
        let hasName = ((user != undefined) && (user.firstName != undefined) && user.lastName != undefined);

        return (
            <div className={'chat_panel'} >

                <div className={'left_placeholder'} >

                    <div className={'users_placeholder'} >
                        <ChatUsersList users={users}
                                       selectedUserId={selectedUserId}
                                       onUserSelect={(u) => {selectUser(u.id)}}
                        />
                    </div>

                </div>

                <div className={'right_placeholder'} >


                    <div className={'right_top_placeholder'} >
                        {user == undefined ? null :
                            <div className={'selected_user_name_placeholder'}>
                                {hasName == true ?
                                    <span>
                                    {user.firstName} {user.lastName}
                                </span> :
                                    <span>
                                    <i className={'icon message'}></i>
                                        {user.email}
                                </span>
                                }
                            </div>
                        }
                    </div>

                    <div className={'right_content_placeholder'} >
                        <div className={'messages_placeholder'} >
                            <ChatUserPanel userId={selectedUserId} />
                        </div>

                        <div className={'info_placeholder'} >
                            <TabbedUserInfoPanel userId={selectedUserId} />
                        </div>
                    </div>

                </div>


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


let getUsers = (state) => {
    let {currentUserId, usersMap} = state.users;
    let messages = state.chat.messagesMap.toArray().sort((a, b) => {return (b.timestamp - a.timestamp)});
    const getLastUserMessage = (userId) => {
        for (let i in messages){
            if (messages[i].fromId == userId || messages[i].toId == userId){
                return messages[i];
            }
        }
    }
    let arr = usersMap.toArray();
    console.log('getUsers: arr = ', arr);
    if (currentUserId == undefined){return []}
    arr = arr.filter(function(u){return (u.id != currentUserId)}).map((u) => {
            return Object.assign({}, u, {
                lastMessage: getLastUserMessage(u.id),
                notReadNumber: getNotReadFriendMessagesNumber(state, u.id)
            })
        })
    return arr;
}


const mapStateToProps = (state) => {
   return {
       selectedUserId: state.chat.selectedUserId,
       user: state.users.usersMap.get(state.chat.selectedUserId),

       users: getUsers(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        selectUser: (id) => {
            return dispatch(chatActions.openChatUser(id))
        }
   }
}

ChatPanel = connect(mapStateToProps, mapDispatchToProps)(ChatPanel)

export default ChatPanel