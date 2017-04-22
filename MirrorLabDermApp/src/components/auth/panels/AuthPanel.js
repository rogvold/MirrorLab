/**
 * Created by sabir on 13.02.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/UsersActions'

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

 import {Spinner} from 'nachos-ui'

 import AuthForm from '../forms/AuthForm'

 import KeyboardSpacer from 'react-native-keyboard-spacer';

 let {width, height} = Dimensions.get('window')

 class AuthPanel extends React.Component {

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

     onLogin = (data) => {
         this.props.onLogin(data);
     }

     onSignup = (data) => {
         this.props.onSignup(data);
     }

     render = () => {
         let {loading, error} = this.props;

         return (
             <View style={styles.container} >

                 <Image source={require('../../../assets/images/km_auth_background.jpg')}
                        style={styles.backgroundImage}>

                     <AuthForm onLogin={this.onLogin}
                               error={error}
                               onSignup={this.onSignup} loading={loading} />

                     <KeyboardSpacer />

                 </Image>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         width: width,
         height: height
     },

     spinner_placeholer: {
         justifyContent: 'center',
         alignItems: 'center',
         flex: 1
     },

     backgroundImage: {
         width: width,
         height: height
         // resizeMode: 'cover', // or 'stretch',

     }

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        error: state.users.error
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        },
        onLogin: (data) => {
            return dispatch(actions.logIn(data))
        },
        onSignup: (data) => {
            return dispatch(actions.signUp(data))
        }
    }
 }

 AuthPanel = connect(mapStateToProps, mapDispatchToProps)(AuthPanel)

 export default AuthPanel