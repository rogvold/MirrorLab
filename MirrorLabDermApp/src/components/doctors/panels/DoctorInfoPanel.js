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

 import CacheableFitImage from '../../image/CacheableFitImage'

 let {width, height} = Dimensions.get('window');

 import I18nText from '../../i18n/I18nText'

 class DoctorInfoPanel extends React.Component {

     static defaultProps = {
        onUpdated: () => {

        }
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
         let {onAdd, selectedDoctorId, closeFindDoctor, unselectDoctor} = this.props;
         let data = {
             friendId: selectedDoctorId
         }
         onAdd(data).then(() => {unselectDoctor()}).then(()=> {closeFindDoctor()})
     }

     onDelete = () => {
         let {onDelete, link, closeFindDoctor, unselectDoctor} = this.props;
         if (link == undefined){
             return;
         }
         onDelete(link.id).then(() => {unselectDoctor()}).then(()=> {closeFindDoctor()})
     }

     render = () => {
         let {doctor, isFriend} = this.props;
         if (doctor == undefined){
             return null;
         }
         if (__DEV__){
             console.log('rendering DoctorInfoPanel: doctor = ', doctor);
         }

         return (
             <View style={{height: height - ((Platform.OS == 'android') ? 22 : 0)}}>

                 <ScrollView style={styles.container} >

                     <View style={styles.avatarPlaceholder} >
                         <CacheableFitImage url={doctor.avatar} style={styles.avatar} />
                     </View>

                     <View style={styles.doctorInfoPlaceholder}>

                         <View style={styles.aboutPlaceholder} >
                             <View style={styles.headerBlock}>
                                <I18nText style={styles.header} name={'ABOUT_DOCTOR'} />
                             </View>
                             <View>
                                 <Text style={[styles.about, styles.p]} >
                                     {doctor.about}
                                 </Text>
                             </View>

                         </View>

                     </View>

                 </ScrollView>

                 <View style={{height: 100, padding: 10, paddingBottom: ((Platform.OS == 'android') ? 22 : 0)}}  >
                     {isFriend == true ?
                         <View style={{alignItems: 'center', justifyContent: 'center'}} >
                             <TouchableOpacity style={styles.deleteDoctorButton} onPress={this.onDelete} >
                                 <I18nText isUpper={true} name={'DELETE_DOCTOR'} style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}} />
                             </TouchableOpacity>
                         </View> :
                         <View style={styles.addDoctorButtonPlaceholder} >
                             <TouchableOpacity style={styles.addDoctorButton} onPress={this.onAdd} >
                                 <I18nText isUpper={true} name={'ADD_DOCTOR_PLUS'} style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}} />
                             </TouchableOpacity>
                         </View>
                     }
                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     avatarPlaceholder: {
         height: 160,
         backgroundColor: 'pink',
         borderBottomWidth: 1,
         borderTopWidth: 1,
         borderTopColor: colors.cellBorder,
         borderBottomColor: colors.cellBorder
     },

     avatar: {
        flex: 1
     },

     doctorInfoPlaceholder: {

     },

     addDoctorButtonPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: ((Platform.OS == 'android') ? 22 : 0)
     },

     addDoctorButton: {
         height: 40,
         padding: 5,
         borderRadius: 20,
         backgroundColor: colors.primaryColor,
         alignItems: 'center',
         justifyContent: 'center',
         alignSelf: 'stretch'
     },

     namePlaceholder: {
        padding: 10,
        // alignItems: 'center'
     },

     userName: {
         fontWeight: 'bold',
         color: colors.inactiveText,
         fontSize: 24,
         // textAlign: 'center'
     },

     aboutPlaceholder: {

     },

     about: {
        color: colors.lightText,
        fontSize: 16
     },

     deleteDoctorButton: {
         height: 40,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.dangerColor,
         padding: 10,
         alignSelf: 'stretch'
     },

     headerBlock: {
         padding: 10,
     },

     header: {
         fontWeight: 'bold',
         color: colors.primaryColor,
         fontSize: 24
     },

     p: {
         color: colors.inactiveText,
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
     if (__DEV__){
         console.log('getLink occured: returning link = ', res);
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
        },
        closeFindDoctor: () => {
            return dispatch(actions.unselectFindDoctorMode());
        },
        unselectDoctor: () => {
            return dispatch(actions.unselectDoctorToView())
        }
    }
 }

 DoctorInfoPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorInfoPanel)

 export default DoctorInfoPanel