/**
 * Created by sabir on 26.03.17.
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

 import * as actions from '../../../actions/UsersActions'

 import * as colors from '../../../constants/AppColors'

 class DoctorInfoPanel extends React.Component {

     static defaultProps = {

     }

     static propTypes = {

     }

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onAdd = () => {
         let {onAdd, selectedDoctorId} = this.props;
         let data = {
             friendId: selectedDoctorId
         }
         onAdd(data);
     }

     onDelete = () => {
         let {onDelete, link} = this.props;
         if (link == undefined){
             return;
         }
         onDelete(link.id);
     }

     render = () => {
         let {doctor, isFriend} = this.props;
         if (doctor == undefined){
             return null;
         }
         if (__DEV__){
             console.log('rendering DoctorInfoPanel');
         }

         return (
             <ScrollView style={styles.container} >

                 <View style={styles.avatarPlaceholder} >
                     <Image source={{uri: doctor.avatar}} style={styles.avatar} />
                 </View>

                 <View style={styles.doctorInfoPlaceholder}>

                     <View style={styles.namePlaceholder} >
                         <Text style={styles.userName} >
                             {doctor.firstName} {doctor.lastName}
                         </Text>
                     </View>

                 </View>


                 {isFriend == true ?
                     <View style={{alignItems: 'center', justifyContent: 'center'}} >
                         <View style={styles.deleteDoctorButton} >
                             <Text style={{textAlign: 'center', color: 'white'}}>
                                 Delete doctor
                             </Text>
                         </View>
                     </View> :
                     <View style={styles.addDoctorButtonPlaceholder} >
                         <TouchableOpacity style={styles.addDoctorButton} onPress={this.onAdd} >
                             <Text style={{textAlign: 'center'}} >
                                 + ADD DOCTOR
                             </Text>
                         </TouchableOpacity>
                     </View>
                 }

             </ScrollView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     avatarPlaceholder: {
         height: 120,
         backgroundColor: 'pink'
     },

     avatar: {
        flex: 1
     },

     doctorInfoPlaceholder: {

     },

     addDoctorButtonPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center'
     },

     addDoctorButton: {
         height: 40,
         padding: 5,
         borderRadius: 15,
         backgroundColor: colors.button2Color,
         alignItems: 'center',
         justifyContent: 'center'
     },

     namePlaceholder: {
        padding: 10,
        alignItems: 'center'
     },

     userName: {
         fontWeight: 'bold',
         color: colors.inactiveText,
         fontSize: 24,
         textAlign: 'center'
     },

     deleteDoctorButton: {
         height: 40,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.dangerColor,
         padding: 10
     }

 });


 let currentDoctorIsFriend = (state) => {
     let lnk = getLink(state);
     return (lnk != undefined)
 }

 let getLink = (state) => {
     let {linksMap, currentUserId, selectedDoctorId} = state.users;
     let arr = linksMap.toArray();
     let res = undefined;
     for (let i in arr){
         let link = arr[i];
         if (link.creatorId == currentUserId && link.friendId == selectedDoctorId){
             res = link;
         }
     }
     return res;
 }

 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        doctor: state.users.usersMap.get(state.users.selectedDoctorId),
        selectedDoctorId: state.users.selectedDoctorId,
        isFriend: currentDoctorIsFriend(state),
        link: getLink(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data) => {
            return dispatch(actions.createLink(data))
        },
        onDelete: (id) => {
            return dispatch(actions.deleteUserLink(id))
        }
    }
 }

 DoctorInfoPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorInfoPanel)

 export default DoctorInfoPanel