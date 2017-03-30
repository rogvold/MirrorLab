/**
 * Created by sabir on 27.03.17.
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

 import I18nText from '../../i18n/I18nText'

 class UserProfileForm extends React.Component {

     static defaultProps = {
         firstName: '',
         lastName: '',

         onSave: (d) => {

         }
     }

     static propTypes = {

     }

     state = {
         firstName: this.props.firstName,
         lastName: this.props.lastName,
         changed: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
         let {firstName, lastName} = nextProps;
         if (firstName != this.props.firstName || lastName != this.props.lastName){
             this.setState({
                 firstName: firstName,
                 lastName: lastName,
                 changed: false
             });
         }
     }

     getData = () => {
         let {firstName, lastName} = this.state;
         return {
             firstName: firstName,
             lastName: lastName
         }
     }

     onSave = () => {
         let data = this.getData();
         let {changed} = this.state;
         if (changed == false){
             return;
         }
         this.props.onSave(data);
     }

     render = () => {
         let {firstName, lastName, changed} = this.state;

         return (
             <View style={styles.container} >

                 <View style={styles.field} >
                     <View style={styles.labelPlaceholder} >
                         <I18nText name={'FIRST_NAME'} style={styles.label} />
                     </View>
                     <View style={styles.inputPlaceholder} >
                         <TextInput value={firstName}
                                    style={styles.input}
                                    onChangeText={(t)=>{this.setState({firstName: t, changed: true})}} />
                     </View>
                 </View>

                 <View style={styles.field} >
                     <View style={styles.labelPlaceholder} >
                         <I18nText name={'LAST_NAME'} style={styles.label} />
                     </View>
                     <View style={styles.inputPlaceholder} >
                         <TextInput value={lastName}
                                    style={styles.input}
                                    onChangeText={(t)=>{this.setState({lastName: t, changed: true})}} />
                     </View>
                 </View>

                 {changed == false ? null :
                     <View style={styles.saveButtonPlaceholder} >
                         <TouchableOpacity style={styles.saveButton} onPress={this.onSave} >
                             <I18nText name={'SAVE'} style={styles.saveButtonText} />
                         </TouchableOpacity>
                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     field: {
        padding: 10,
        height: 70,
        marginBottom: 10
     },

     inputPlaceholder: {
         height: 35,
     },

     input: {
         flex: 1,
         borderWidth: 1,
         borderColor: colors.cellBorder,
         paddingLeft: 10,
         borderRadius: 4
     },

     labelPlaceholder: {
        height: 15,
        marginBottom: 10
     },

     label: {
         fontWeight: 'bold',
         color: colors.lightText
     },

     saveButtonPlaceholder: {
        padding: 10
     },

     saveButton: {
         height: 40,
         borderRadius: 20,
         backgroundColor: colors.primaryColor,
         alignSelf: 'stretch',
         alignItems: 'center',
         justifyContent: 'center'
     },

     saveButtonText: {
         fontWeight: 'bold',
         textAlign: 'center',
         color: 'white'
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

 //UserProfileForm = connect(mapStateToProps, mapDispatchToProps)(UserProfileForm)

 export default UserProfileForm