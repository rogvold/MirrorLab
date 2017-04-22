/**
 * Created by sabir on 13.02.17.
 */

import ParseAPI from '../../../api/ParseAPI'

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableHighlight,
     TouchableOpacity,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
 } from 'react-native';

 import ReactNative from 'react-native';



 import {Input, Spinner, Button} from 'nachos-ui';

 // import MyButton from '../../buttons/MyButton'

 import * as colors from '../../../constants/AppColors'

 import I18nText from '../../i18n/I18nText'

 import PrimaryButton from '../../buttons/PrimaryButton'

 import I18nHelper from '../../../helpers/I18nHelper'

 import CommonHelper from '../../../helpers/CommonHelpers'

 class LoginForm extends React.Component {

     static defaultProps = {
         onSubmit (data){
             console.log('default onSubmit occured: data = ', data);
         },
         loading: false,
         dotChar: '*'
     }

     static propTypes = {
         onSubmit: PropTypes.func,
         loading: PropTypes.bool
     }

     state = {
         email: '',
         password: ''
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount(){

     }

     componentWillReceiveProps(){

     }

     getData = () => {
         return {
             email: this.state.email,
             password: this.state.password
         }
     }

     onSubmit = () => {
         this.props.onSubmit(this.getData());
     }

     canSubmit () {
         let data = this.getData();
         if (ParseAPI.isEmail(data.email) == false || data.password == undefined || data.password.trim() == ''){
             return false;
         }
         return true;
     }


     render = () => {
         let {loading, lang} = this.props;
         let canSubmit = this.canSubmit() && (loading == false);
         let {email, password} = this.state;

         return (
             <View style={styles.container} >

                 <View style={styles.field} >
                     {(email == undefined || email.trim() == '') ? null :
                         <I18nText style={styles.label} name={'EMAIL'} />
                     }
                     <TextInput
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            value={email}
                            style={styles.input}
                            placeholder={I18nHelper.getString(lang, 'EMAIL')}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                            onChangeText={(v) => {this.setState({email: v.toLowerCase().trim()})}} />
                 </View>

                 <View style={styles.field} >
                     {(password == undefined || password.trim() == '') ? null :
                         <I18nText style={styles.label} name={'PASSWORD'} />
                     }
                     <TextInput
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            value={password}
                            style={styles.input}
                            secureTextEntry={true}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                            placeholder={I18nHelper.getString(lang, 'PASSWORD')} type={'password'}
                            onChangeText={(v) => {this.setState({password: v.toLowerCase().trim()})}} />
                 </View>

                 <View style={styles.button_placeholder}>
                     <PrimaryButton
                         disabled={!canSubmit}
                         onPress={this.onSubmit} >
                         <I18nText name={'LOGIN'}
                                   isUpper={true}
                                   style={styles.buttonText} />
                     </PrimaryButton>

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 10,
         marginVertical: 10
     },

     form_placeholder: {

     },

     field: {
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)'
     },

     label: {
        backgroundColor: 'transparent',
        color: 'white',
        opacity: 0.7
     },

     input: {
         color: 'white',
         height: 40,
         fontSize: 18
     },

     button_placeholder: {
        marginVertical: 10
     },



     buttonText: {
         textAlign: 'center',
         color: 'white',
         fontSize: 18
     }


 });


 const mapStateToProps = (state) => {
    return {
        lang: state.settings.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginForm

