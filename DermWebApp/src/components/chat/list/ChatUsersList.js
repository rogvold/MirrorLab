/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment'

import * as constants from '../../../constants/config'

class ChatUsersList extends React.Component {

    static defaultProps = {
        users: [],

        selectedUserId: undefined,

        onUserSelect: () => {

        }

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

    render = () => {
        let {users, selectedUserId, onUserSelect} = this.props;

        return (
            <div className={'chat_users_list'} >

                {users.map((u, k) => {
                    let key = 'user_' + u.id;
                    let hasNoName = ((u.firstName == undefined || u.firstName.trim() == '') && (u.lastName == undefined || u.lastName.trim() == '' ));
                    let isSelected = (selectedUserId == u.id);
                    let ava = (u.avatar == undefined) ? constants.FACELESS_AVATAR : u.avatar;
                    let {lastMessage} = u;
                    let lastMessageText = 'Нет сообщений';
                    if (lastMessage != undefined){
                        if (lastMessage.toId == u.id){
                            lastMessageText = 'Вы: ' + lastMessage.content;
                        }else {
                            lastMessageText = lastMessage.content;
                        }
                    }

                    return (
                        <div
                            key={key}
                            onClick={() => {onUserSelect(u)}}
                            className={'user_item ' + (isSelected == true ? ' selected ' : ' ') + (lastMessage == undefined ? ' has_no_messages ' : ' has_messages ')} >

                            <div className={'left_placeholder'} >
                                <div className={'avatar_placeholder'} >
                                    <div className={'avatar'} style={{backgroundImage: 'url("' + ava + '")'}} ></div>
                                </div>
                            </div>

                            <div className={'center_placeholder'} >
                                <div className={'user_name_placeholder'} >
                                    <div className={'name'} >
                                        {hasNoName == true ?
                                            <span>
                                                <i className={'icon envelope'} ></i> {u.email}
                                            </span> :
                                            <span >
                                                {u.firstName} {u.lastName}
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className={'last_message_placeholder'} >
                                    <div className={'last_message'} >
                                        {lastMessageText}
                                    </div>
                                </div>
                            </div>

                            <div className={'right_placeholder'} >
                                {u.lastMessage == undefined ? null :
                                    <div className={'last_message_time_placeholder'} >
                                        <div className={'last_message_time'} >
                                            {moment(u.lastMessage.timestamp).format('HH:mm')}
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>
                    )
                })}

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

//ChatUsersList = connect(mapStateToProps, mapDispatchToProps)(ChatUsersList)

export default ChatUsersList