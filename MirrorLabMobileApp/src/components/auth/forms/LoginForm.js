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
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
 } from 'react-native';

 import ReactNative from 'react-native';



 import {Input, Spinner, Button} from 'nachos-ui';

 // import MyButton from '../../buttons/MyButton'

 class LoginForm extends React.Component {

     static defaultProps = {
         onSubmit (data){
             console.log('default onSubmit occured: data = ', data);
         },
         loading: false
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
         let {loading} = this.props;
         let canSubmit = this.canSubmit() && (loading == false);

         return (
             <View style={styles.container} >

                 <View style={styles.field} >
                     <Text style={styles.label}>
                         Email
                     </Text>
                     <Input value={this.state.email}
                            placeholder={'Email'}
                            onChangeText={(v) => {this.setState({email: v})}} />
                 </View>

                 <View style={styles.field} >
                     <Text style={styles.label}>
                         Password
                     </Text>
                     <Input value={this.state.password}
                            placeholder={'Password'} type={'password'}
                            onChangeText={(v) => {this.setState({password: v})}} />
                 </View>

                 <View style={styles.button_placeholder}>
                     {Platform.OS != 'ios' ?
                         <ReactNative.Button onPress={this.onSubmit} disabled={!canSubmit} title={loading == true ? 'Loading...' : 'Login'} /> :
                         <Button onPress={this.onSubmit} disabled={!canSubmit} >
                             {loading == true ? 'Loading...' : 'Login'}
                         </Button>
                     }

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
        marginVertical: 5
     },

     label: {

     },

     button_placeholder: {
        marginVertical: 10
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

 // LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginForm

