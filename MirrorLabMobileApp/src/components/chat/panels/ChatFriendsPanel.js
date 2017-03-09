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

 class ChatFriendsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
         selectedUserId: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {loadFreshMessages} = this.props;
        loadFreshMessages();
     }

     componentWillReceiveProps() {

     }

     onUserPress = (userId) => {
         this.setState({
             selectedUserId: userId
         });
     }

     getSelectedUser = () => {
         let {users} = this.props;
         let userId = this.state.selectedUserId;
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
         let {users} = this.props;
         let {selectedUserId} = this.state;
         let selectedUser = this.getSelectedUser();

         return (
             <View style={styles.container} >

                 <View style={styles.listPlaceholder}>

                     <ChatUsersList users={users} onUserPress={this.onUserPress} />

                 </View>

                 <Modal
                     animationType={'slide'}
                     transparent={this.state.transparent}
                     visible={(selectedUserId != undefined)}
                     onRequestClose={() => {this.setState({selectedUserId: undefined})}}
                 >

                     {selectedUser == undefined ? null :
                         <View style={styles.modalInner} >

                             <View style={styles.modalHeader} >

                                 <TouchableOpacity style={styles.headerBackPlaceholder} onPress={() => {this.setState({selectedUserId: undefined})}} >
                                     <Text style={styles.backButton} >
                                         <Icon name="chevron-left" color={colors.messengerColor} size={16} style={{marginRight: 5}} />
                                         Back
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
         backgroundColor: 'whitesmoke'
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
         color: colors.messengerColor,
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
        height: height - 40,
         width: width,
     },

 });


 let getUsers = (state) => {
     let {usersMap, currentUserId} = state.users;
     let users = usersMap.toArray();
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
     } )
     return users;
 }

 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        users: getUsers(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        loadFreshMessages: () => {
            return dispatch(actions.loadUserMessages());
        }
    }
 }

 ChatFriendsPanel = connect(mapStateToProps, mapDispatchToProps)(ChatFriendsPanel)

 export default ChatFriendsPanel