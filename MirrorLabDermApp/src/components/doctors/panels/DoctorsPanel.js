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

 import * as colors from '../../../constants/AppColors'

 import * as actions from '../../../actions/UsersActions'

 import KeyboardSpacer from 'react-native-keyboard-spacer'

 import Icon from 'react-native-vector-icons/FontAwesome'

 import DoctorInfoPanel from './DoctorInfoPanel'

 import CacheableFitImage from '../../image/CacheableFitImage'

 let {width, height} = Dimensions.get('window');

 import I18nText from '../../i18n/I18nText'

 import I18nHelper from '../../../helpers/I18nHelper'

 class DoctorsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         this.props.loadDoctors();
     }

     componentWillReceiveProps() {

     }

     getDoctors = () => {
         let {doctors} = this.props;
         let {searchQuery} = this.state;
         if (searchQuery == undefined || searchQuery.trim() == ''){
             return doctors;
         }
         let res = doctors.filter((d) => {
             let s = (d.firstName + ' ' + d.lastName).toLowerCase();
             return (s.indexOf(searchQuery.toLowerCase()) > -1);
         })
         return res;
     }

     render = () => {
         let {isMyDoctor, loading, lang, selectedDoctorId, selectDoctor, unselectDoctor, selectedDoctor, closeFindDoctor} = this.props;
         let {searchQuery} = this.state;
         let doctors = this.getDoctors();

         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                     <I18nText name={'FIND_DOCTOR'}
                               style={{textAlign: 'center', fontSize: 20,
                                       fontWeight: 'bold', color: colors.fbColor}} />

                     <TouchableOpacity onPress={() => {closeFindDoctor()}}
                         style={{position: 'absolute', left: 5, top: 0, bottom: 0, width: 80, justifyContent: 'center'}} >
                         <View style={{alignItems: 'center', flexDirection: 'row'}} >
                             <Icon name="chevron-left" size={20} color={colors.lightText} style={{marginRight: 5}} />
                             <I18nText name={'BACK'} style={{fontSize: 20, color: colors.lightText}} />
                         </View>
                     </TouchableOpacity>
                 </View>

                 <View style={styles.searchInputPlaceholder} >
                     <TextInput
                                placeholder={I18nHelper.getString(lang, 'FIND_DOCTOR')}
                                style={styles.searchInput} onChangeText={(t) => {this.setState({searchQuery: t})}}
                                value={searchQuery} />
                 </View>

                 <ScrollView style={styles.listPlaceholder}>
                     {doctors.map((d, k) => {
                         let key = 'doctor_' + k + '_' + d.id;
                         let avaSt = [styles.avatar];
                         if (isMyDoctor(d.id) == true){
                             avaSt.push(styles.activeAvatar);
                         }

                         return (
                             <TouchableOpacity style={styles.doctorItem} key={key} onPress={() => {selectDoctor(d.id)}} >

                                 <View style={{flexDirection: 'row',}} >

                                     <View style={styles.avatarPlaceholder} >
                                        <CacheableFitImage url={d.avatar} style={avaSt} />
                                     </View>

                                     <View style={styles.infoPlaceholder} >
                                         <View style={styles.userNamePlaceholder} >
                                             <Text style={styles.userName} >
                                                 {d.firstName} {d.lastName}
                                             </Text>
                                         </View>
                                         <View style={styles.jobTitlePlaceholder}>
                                             <Text style={styles.jobTitle} >
                                                 {d.jobTitle}
                                             </Text>
                                         </View>
                                     </View>

                                 </View>

                             </TouchableOpacity>
                         )

                     })}
                 </ScrollView>

                 <Modal
                     animationType={"slide"}
                     transparent={false}
                     visible={(selectedDoctor != undefined)}
                 >

                     <View style={styles.modal_style} >

                         <TouchableOpacity style={styles.backPlaceholder} onPress={() => {unselectDoctor()}}>

                             <View>
                                 <Text style={{fontSize: 20, color: colors.lightText}} >
                                     <Icon name="chevron-left" size={24} color={colors.lightText} style={{marginRight: 5}} />
                                 </Text>
                             </View>


                             <View style={{position: 'absolute', left: 0, bottom: 0, right: 0, top: 0, justifyContent: 'center', alignItems: 'center'}} >
                                 <Text style={{textAlign: 'center', fontWeight: 'bold', color: colors.inactiveText, fontSize: 20}} >
                                     {selectedDoctor == undefined ? null :
                                         (selectedDoctor.firstName + ' ' + selectedDoctor.lastName)
                                     }
                                 </Text>
                             </View>

                         </TouchableOpacity>

                         {selectedDoctor == undefined ? null :
                             <View style={styles.doctorInfoPanelPlaceholder} >
                                 <DoctorInfoPanel />
                             </View>
                         }

                     </View>

                 </Modal>

                 <KeyboardSpacer />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         flexDirection: 'column',
         alignItems: 'stretch'
     },

     headerPlaceholder: {
         height: 40,
         padding: 10,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder,
         justifyContent: 'center'
     },



     searchInputPlaceholder: {
         height: 50,
         padding: 5
     },

     searchInput: {
         color: colors.inactiveText,
         flex: 1
     },

     listPlaceholder: {
         flex: 1,
         padding: 5,
         paddingBottom: 10,
         alignSelf: 'stretch'
     },

     doctorItem: {
         // backgroundColor: 'pink',
         minHeight: 60,
         borderRadius: 4,
         marginBottom: 10,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder
     },

     avatarPlaceholder: {
        width: 60,
         alignItems: 'flex-start'
     },

     avatar: {
         width: 50,
         height: 50,
         borderRadius: 4
     },

     activeAvatar: {
        borderWidth: 2,
         borderColor: colors.primaryColor
     },

     infoPlaceholder: {

     },

     userNamePlaceholder: {
        flex: 1
     },

     jobTitlePlaceholder: {
         flex: 1
     },

     jobTitle: {
        color: colors.inactiveText
     },

     userName: {
        fontWeight: 'bold',
         fontSize: 20,
         color: colors.darkText
     },

     backPlaceholder: {
         height: 40,
         backgroundColor: 'white',
         padding: 10,
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
     },

     modal_style: {
         height: height,
         // marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0
     },

     doctorInfoPanelPlaceholder: {
         height: height - 40 - (Platform.OS == 'android' ? StatusBar.currentHeight : 0),
         width: width
     }

 });

 let getDoctors = (state) => {
     let doctors = state.users.usersMap.toArray().filter((d) => {
         return (d.userRole == 'doctor');
     }).sort((a, b) => {
         if (a.lastName < b.lastName){return -1;}
         if (a.lastName > b.lastName){return 1;}
         return 0;
     })
     return doctors;
 }

 let isMyDoctor = (state, doctorId) => {
     let {usersMap, linksMap, currentUserId} = state.users;
     let f = false;
     let arr = linksMap.toArray();
     for (let i in arr){
         let a = arr[i];
         if (a.friendId == doctorId){
             f = true;
         }
     }
     return f;
 }

 const mapStateToProps = (state) => {
    return {
        lang: state.settings.lang,
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        selectedDoctorId: state.users.selectedDoctorId,
        doctors: getDoctors(state),
        selectedDoctor: state.users.usersMap.get(state.users.selectedDoctorId),
        isMyDoctor: (doctorId) => {
            return isMyDoctor(state, doctorId)
        }
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        loadDoctors: () => {
            return dispatch(actions.loadDoctors())
        },
        selectDoctor: (id) => {
            return dispatch(actions.selectDoctorToView(id))
        },
        unselectDoctor: () => {
            return dispatch(actions.unselectDoctorToView())
        },
        closeFindDoctor: () => {
            return dispatch(actions.unselectFindDoctorMode())
        }
    }
 }

 DoctorsPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorsPanel)

 export default DoctorsPanel