/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CreateMessagePanel from './CreateMessagePanel'

import MessagesPanel from './MessagesPanel'

class ChatUserPanel extends React.Component {

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

    render = () => {
        let {user, currentUserId} = this.props;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'chat_user_panel'} >

                <div className={'user_name_placeholder'} >
                    {user.firstName} {user.lastName}
                </div>

                <div className={'messages_placeholder'} >
                    <MessagesPanel userId={user.id} />
                </div>

                <div className={'create_message_placeholder'} >
                    <CreateMessagePanel fromId={currentUserId} toId={user.id} />
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       user: state.users.usersMap.get(ownProps.userId),
       currentUserId: state.users.currentUserId
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

ChatUserPanel = connect(mapStateToProps, mapDispatchToProps)(ChatUserPanel)

export default ChatUserPanel