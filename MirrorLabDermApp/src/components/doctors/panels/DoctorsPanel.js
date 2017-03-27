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
         let {isMyDoctor, loading, selectedDoctorId, selectDoctor, unselectDoctor, selectedDoctor} = this.props;
         let {searchQuery} = this.state;
         let doctors = this.getDoctors();

         return (
             <View style={styles.container} >

                 <View style={styles.searchInputPlaceholder} >
                     <TextInput
                                placeholder={'Find a doctor...'}
                                style={styles.searchInput} onChangeText={(t) => {this.setState({searchQuery: t})}}
                                value={searchQuery} />
                 </View>

                 <ScrollView style={styles.listPlaceholder}>
                     {doctors.map((d, k) => {
                         let key = 'doctor_' + k + '_' + d.id;

                         return (
                             <TouchableOpacity style={styles.doctorItem} key={key} onPress={() => {selectDoctor(d.id)}} >

                                 <View style={styles.doctorItem} >

                                     <View style={styles.avatarPlaceholder} >
                                        <Image source={{uri: d.avatar}} style={styles.avatar} />
                                     </View>

                                     <View style={styles.infoPlaceholder} >
                                         <View style={styles.userNamePlaceholder} >
                                             <Text style={styles.userName} >
                                                 {d.firstName} {d.lastName}
                                             </Text>
                                         </View>
                                         <View>
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
                             <Text style={{alignSelf: 'center'}} >
                                 <Icon name="chevron-left" size={24} color={colors.lightText} />
                                 Back
                             </Text>
                         </TouchableOpacity>

                         {selectedDoctor == undefined ? null :
                             <ScrollView >
                                 <DoctorInfoPanel />
                             </ScrollView>
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

     searchInputPlaceholder: {
         height: 50,
         // backgroundColor: 'purple'
     },

     searchInput: {
         color: colors.inactiveText,
         flex: 1
     },

     listPlaceholder: {
         flex: 1,
         paddingBottom: 10,
         // backgroundColor: 'blue',
         alignSelf: 'stretch'
     },

     doctorItem: {
         flexDirection: 'row',
         // backgroundColor: 'pink',
         height: 60,
         borderRadius: 4,
         marginBottom: 10,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder
     },

     avatarPlaceholder: {
        width: 60,
        // padding: 10,
        // backgroundColor: 'yellow',
         alignItems: 'flex-start'
     },

     avatar: {
         width: 50,
         height: 50,
         borderRadius: 4
     },

     infoPlaceholder: {
        // flex: 1
        //  alignSelf: 'stretch'
     },

     userNamePlaceholder: {

     },

     jobTitlePlaceholder: {

     },

     jobTitle: {

     },

     userName: {
        fontWeight: 'bold',
         fontSize: 16,
         color: colors.darkText
     },

     backPlaceholder: {
         height: 40,
         backgroundColor: 'white',
         padding: 10,
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
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
        }
    }
 }

 DoctorsPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorsPanel)

 export default DoctorsPanel