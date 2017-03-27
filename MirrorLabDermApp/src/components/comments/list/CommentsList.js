/**
 * Created by sabir on 25.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     Picker,
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

 import * as colors from '../../../constants/AppColors'

 class CommentsList extends React.Component {

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

     render = () => {
         let {comments} = this.props;

         return (
             <View style={styles.container} >

                 {comments.map((c, k) => {
                     let {comment, user} = c;
                     let key = 'key_' + comment.id + '_' + comment.id;

                     return (
                         <View key={key} style={styles.commentItem} >

                             <View style={styles.leftPlaceholder} >
                                 <View style={styles.avatarPlaceholder} >
                                     <Image source={{uri: user.avatar}} style={styles.avatar} />
                                 </View>
                             </View>

                             <View style={styles.rightPlaceholder} >
                                 <View style={styles.userNamePlaceholder} >
                                     <Text style={styles.userName} >
                                         {user.firstName} {user.lastName}
                                     </Text>
                                 </View>
                                 <View style={styles.commentBodyPlaceholder} >
                                     <Text style={styles.commentText} >
                                         {comment.text}
                                     </Text>
                                 </View>
                             </View>

                         </View>
                     )
                 })}


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     commentItem: {
         flexDirection: 'row',
         paddingBottom: 5,
         paddingTop: 5,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder
     },

     leftPlaceholder: {
         width: 60,
         justifyContent: 'flex-start',
         alignItems: 'center'
     },

     avatarPlaceholder: {

     },

     avatar: {
         width: 40,
         height: 40,
         borderRadius: 2
     },

     rightPlaceholder: {
        flex: 1
     },

     userNamePlaceholder: {

     },

     commentText: {
        opacity: 0.8
     },

     commentBodyPlaceholder: {

     },



     userName: {
         fontWeight: 'bold'
     }

 });


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

 //CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsList)

 export default CommentsList