/**
 * Created by sabir on 07.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as chatActions from '../../../actions/ChatActions'

 import {
     AppRegistry,
     StyleSheet,
     NativeModules,
     Text,
     Modal,
     Dimensions,
     View,
     ListView,
     StatusBar,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableHighlight,
     TouchableOpacity,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

import { GiftedChat } from 'react-native-gifted-chat';

 class ChatUserPanel extends React.Component {

     static defaultProps = {
         friendId: 'wHF6qBvHzf'
     }

     static propTypes = {}

     state = {
         messages: this.props.messages
         //     [
         //     {
         //         _id: 1,
         //         text: 'Salut Sabir!',
         //         createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
         //         user: {
         //             _id: 2,
         //             name: 'Audrey Tautou',
         //             avatar: 'https://allisonbarberamakeup.files.wordpress.com/2017/01/audrey.jpg',
         //         },
         //     },
         //
         //     {
         //         _id: 2,
         //         text: 'Salut Audrey!',
         //         createdAt: new Date(Date.UTC(2016, 7, 30, 17, 21, 0)),
         //         user: {
         //             _id: 1,
         //             name: 'Sabir',
         //             avatar: 'https://avatars0.githubusercontent.com/u/1834389?v=3&s=400',
         //         },
         //         image: 'https://pp.userapi.com/c638329/v638329418/1922/J17mmrLnUWQ.jpg'
         //     },
         //
         // ]
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onSend = (messages = []) => {
         if (__DEV__){
             console.log('onSend: messages = ', messages);
         }
         let {sendMessage, friendId, currentUser} = this.props;
         let text = messages[0].text;
         let data = {content: text, toId: friendId};

         sendMessage(data).then(
             (data) => {
                 let {message} = data;
                 let m = transformMessage(message, currentUser)
                 this.setState((previousState) => {
                     return {
                         messages: GiftedChat.append(previousState.messages, [m]),
                     };
                 });
             }
         )

     }

     render = () => {
         let {currentUser, loading} = this.props;
         if (currentUser == undefined){
             return null;
         }

         return (
             <GiftedChat
                 messages={this.state.messages}
                 onSend={this.onSend}
                 renderAvatarOnTop={true}
                 user={{
                              _id: currentUser.id,
                              name: currentUser.firstName + ' ' + currentUser.lastName,
                              avatar: 'https://avatars0.githubusercontent.com/u/1834389?v=3&s=400',
                            }}
             />
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });

 let transformMessage = (m, u) => {
     return {
         _id: m.id,
         createdAt: new Date(m.timestamp),
         text: m.content,
         user: {
             _id: u.id,
             avatar: u.avatar,
             name: u.firstName + ' ' + u.lastName
         }
     }
 }

 let getMessagesForChat = (state, friendId) => {
     if (__DEV__){
         console.log('getMessagesForChat: friendId = ', friendId);
     }
     let {usersMap, currentUserId} = state.users;
     let {messagesMap} = state.chat;
     let allMessages = messagesMap.toArray();

     if (__DEV__){
         console.log('all messages = ', allMessages);
     }

     let messages = allMessages.sort((a, b) => {
         return (b.timestamp - a.timestamp);
     }).filter((m) => {
         return (
             (m.fromId == friendId && m.toId == currentUserId) ||
             (m.fromId == currentUserId && m.toId == friendId)
         );
     }).map((m) => {
         let author = usersMap.get(m.fromId);
         return transformMessage(m, author)
     });
     if (__DEV__){
         console.log('returning ', messages);
     }
     return messages;
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        currentUserId: state.users.currentUserId,
        currentUser: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading || state.chat.loading,
        messages: getMessagesForChat(state, ownProps.friendId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: function(data){
            return dispatch(chatActions.createMessage(data))
        }
    }
 }

 ChatUserPanel = connect(mapStateToProps, mapDispatchToProps)(ChatUserPanel)

 export default ChatUserPanel