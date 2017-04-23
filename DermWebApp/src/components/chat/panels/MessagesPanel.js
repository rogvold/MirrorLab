/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MessagesList from '../list/MessagesList'

class MessagesPanel extends React.Component {

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
        let {messages} = this.props;


        return (
            <div className={'messages_panel'} >

                {messages.length == 0 ?
                    <div className={'empty_placeholder'} >
                        У вас еще нет ни одного сообщения от этого пациента. Начните диалог.
                    </div> :
                    <div className={'messages_list_placeholder'} >
                        <MessagesList messages={messages} />
                    </div>
                }


            </div>
        )
    }

}

let getMessages = (state, userId) => {
    let {messagesMap} = state.chat;
    let {currentUserId} = state.userId;
    let messages = messagesMap.toArray().filter((m) => {
        return ((m.fromId == currentUserId && m.toId == userId) || (m.fromId == userId && m.toId == currentUserId) );
    }).sort((a, b) => {
        return (a.timestamp - b.timestamp)
    })
    return messages;
}

const mapStateToProps = (state, ownProps) => {
   return {
       loading: state.chat.loading,
       messages: getMessages(state, ownProps.userId)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

MessagesPanel = connect(mapStateToProps, mapDispatchToProps)(MessagesPanel)

export default MessagesPanel