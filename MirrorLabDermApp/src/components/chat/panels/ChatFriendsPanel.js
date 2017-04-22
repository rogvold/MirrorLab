/**
 * Created by sabir on 08.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

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

 import CacheableFitImage from '../../image/CacheableFitImage'

 import ChatUsersList from '../list/ChatUsersList'

 import ChatUserPanel from './ChatUserPanel'

 const { width, height } = Dimensions.get('window')

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../../constants/AppColors'

 import * as actions from '../../../actions/ChatActions'

 import I18nHelper from '../../../helpers/I18nHelper'

 import I18nText from '../../i18n/I18nText'

 class ChatFriendsPanel extends React.Component {

     static defaultProps = {
         checkMessagesInterval: 10 * 1000
     }

     static propTypes = {}

     state = {
         selectedUserId: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {loadFreshMessages, checkMessagesInterval} = this.props;
        loadFreshMessages();
         this.viewSelectedUserMessages();
        if (this.interval == undefined){
            this.interval = setInterval(() => {
                loadFreshMessages();
                this.viewSelectedUserMessages();
            }, checkMessagesInterval)
        }
     }

     componentWillUnmount() {
         if (this.interval != undefined){
             clearInterval(this.interval);
         }
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

     componentWillReceiveProps() {

     }

     componentWillMount() {
         StatusBar.setHidden(true);
     }

     onUserPress = (userId) => {
         let {openUser} = this.props;
         openUser(userId);
     }

     getSelectedUser = () => {
         let {users} = this.props;
         let userId = this.props.selectedUserId;
         let res = undefined;
         for (let i in users){
             if (users[i].id == userId){
                 res = users[i];
                 break;
             }
         }
         return res;
     }


     render = () => {
         let {users, selectedUserId, openUser, closeUser, getNotReadMessagesNumber, lang} = this.props;
         let selectedUser = this.getSelectedUser();

         return (
             <View style={styles.container} >

                 <StatusBar hidden={true} />

                 {users.length == 0 ?
                    <View style={{alignItems: 'center', justifyContent: 'center', padding: 10}} >
                        <I18nText name={'YOU_HAVE_NO_DOCTORS'} style={{textAlign: 'center'}} />
                    </View> : null
                 }

                 <View style={styles.listPlaceholder}>

                     <ChatUsersList users={users} getNotReadMessagesNumber={getNotReadMessagesNumber}
                                    onUserPress={this.onUserPress} />

                 </View>

                 <Modal
                     animationType={'slide'}
                     transparent={this.state.transparent}
                     visible={(selectedUserId != undefined)}
                     onRequestClose={() => {closeUser()}}
                 >

                     {selectedUser == undefined ? null :
                         <View style={styles.modalInner} >

                             <View style={styles.modalHeader} >

                                 <TouchableOpacity style={styles.headerBackPlaceholder} onPress={() => {closeUser()}} >
                                     <Text style={styles.backButton} >
                                         <Icon name="chevron-left" color={colors.fbColor} size={16} style={{marginRight: 5}} />
                                         {I18nHelper.getString(lang, 'BACK')}
                                     </Text>
                                 </TouchableOpacity>

                                 <View style={styles.selectedUserPlaceholder} >
                                     <Text style={styles.selectedUserText}>
                                         {selectedUser.firstName + ' ' + selectedUser.lastName}
                                     </Text>
                                 </View>

                             </View>

                             <View style={styles.modalContent} >
                                 <ChatUserPanel friendId={selectedUserId} />
                             </View>

                         </View>
                     }

                 </Modal>

             </View>
         )
     }

 }

 let styles = StyleSheet.create({
     container: {
         flex: 1,
         // backgroundColor: 'pink'
     },

     listPlaceholder: {
        flex: 1,
         // backgroundColor: 'red'
     },

     modalInner: {
        flex: 1,
         backgroundColor: 'whitesmoke',
         // marginTop: (Platform.OS == 'android') ? -22 : 0
         // paddingBottom: (Platform.OS == 'android') ? 22 : 0
     },

     modalHeader: {
         height: 40,
         backgroundColor: 'white',
         // borderBottomWidth: 1,
         // borderBottomColor: 'grey',
         padding: 10,

         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
         // justifyContent: 'center',
         // alignItems: 'center'
     },

     headerBackPlaceholder: {
         width: width / 6,
         // backgroundColor: 'yellow'
     },

     backButton: {
         color: colors.fbColor,
         fontSize: 16
     },

     selectedUserPlaceholder: {
         width: width * 2 / 3,
         // backgroundColor: 'pink'
     },

     selectedUserText: {
         textAlign: 'center',
         color: colors.inactiveText,
         fontSize: 16
     },

     modalContent: {
        height: height - 40 - (Platform.OS == 'android' ? StatusBar.currentHeight : 0),
        width: width,
     },

 });


 let getUsers = (state) => {
     let {usersMap, currentUserId, linksMap} = state.users;
     let links = linksMap.toArray();
     let users = links.map((l) => {
         return usersMap.get(l.friendId)
     }).filter((a) => {return (a != undefined)});
     users.sort((a, b) => {
         let s1 = (a.firstName == undefined) ? '' : a.firstName;
         let s2 = (b.firstName == undefined) ? '' : b.firstName;
         s1 = s1.toLowerCase();
         s2 = s2.toLowerCase();
         if (s1 > s2){return 1}
         if (s1 < s2){return 1}
         return 0;
     });
     users = users.filter( (u) => {
         return (u.id != currentUserId)
     })
     return users;
 }

let getNotReadFriendMessagesNumber = (state, friendId) => {
    let {messagesMap} = state.chat;
    let {currentUserId} = state.users;
    let messages = messagesMap.toArray().filter((m) => {return ((m.fromId == friendId) && (m.toId == currentUserId) && (m.viewed != true))})
    return messages.length;
}

 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        selectedUserId: state.chat.selectedUserId,
        lang: state.settings.lang,
        users: getUsers(state),
        getNotReadMessagesNumber: uId => getNotReadFriendMessagesNumber(state, uId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        loadFreshMessages: () => {
            return dispatch(actions.loadUserMessages());
        },
        openUser: (id) => {
            return dispatch(actions.openChatUser(id));
        },
        closeUser: () => {
            return dispatch(actions.closeChatUser());
        },
        viewMessagesFromSelectedUser: () => {
            return dispatch(actions.viewMessagesFromSelectedUser())
        }
    }
 }

 ChatFriendsPanel = connect(mapStateToProps, mapDispatchToProps)(ChatFriendsPanel)

 export default ChatFriendsPanel