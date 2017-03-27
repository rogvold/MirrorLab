/**
 * Created by sabir on 13.02.17.
 */


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
     Dimensions
 } from 'react-native';

 import LoginForm from './LoginForm'
 import SignupForm from './SignupForm'

 class AuthForm extends React.Component {

     static defaultProps = {
         onLogin: (data) => {
             if (__DEV__){
                 console.log('default on login: data = ', data);
             }
         },
         onSignup: (data) => {
             console.log('default on signup: data = ', data);
         },

         error: undefined,
         loading: false
     }

     static propTypes = {
         loading: PropTypes.bool
     }

     state = {
         mode: 'login'
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onLogin = (data) => {
         this.props.onLogin(data);
     }

     onSignup = (data) => {
         this.props.onSignup(data);
     }

     switchMode = () => {
         if (__DEV__){
             console.log('switchMode occured');
         }
         let {mode} = this.state;
         if (mode == 'login'){
             this.setState({
                 mode: 'signup'
             });
         }else {
             this.setState({
                 mode: 'login'
             });
         }
     }

     render = () => {
         let {mode} = this.state;
         let {loading, error} = this.props;

         return (
             <View style={styles.container} >

                 {mode != 'login' ? null :
                     <View style={styles.login_form_placeholder}  >
                         <LoginForm onSubmit={this.onLogin} loading={loading} error={error} />
                     </View>
                 }

                 {mode != 'signup' ? null :
                     <View style={styles.signup_form_placeholder}  >
                         <SignupForm onSubmit={this.onSignup} loading={loading} error={error} />
                     </View>
                 }

                 <TouchableHighlight style={styles.switcher_placeholder} onPress={this.switchMode} underlayColor={'white'} >
                     <Text>
                         {mode == 'login' ? 'Do not have an account? Sign up!' : 'Have an account? Sign in!' }
                     </Text>
                 </TouchableHighlight>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
     },

     login_form_placeholder: {
         height: 240,
         width: Math.min(Dimensions.get('window').width - 20, 300),
         // backgroundColor: 'whitesmoke'
     },

     signup_form_placeholder: {
         height: 320,
         width: Math.min(Dimensions.get('window').width - 20, 300),
         // backgroundColor: 'whitesmoke'
     },

     switcher_placeholder: {
         height: 30,
         alignItems: 'center',
         justifyContent: 'center'
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

 //AuthForm = connect(mapStateToProps, mapDispatchToProps)(AuthForm)

 export default AuthForm