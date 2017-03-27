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
     ActivityIndicator
 } from 'react-native';

 import {Spinner} from 'nachos-ui'

 import AuthForm from '../forms/AuthForm'

 import KeyboardSpacer from 'react-native-keyboard-spacer';

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

                 <AuthForm onLogin={this.onLogin}
                           error={error}
                           onSignup={this.onSignup} loading={loading} />

                 <KeyboardSpacer />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 2,
     },

     spinner_placeholer: {
         justifyContent: 'center',
         alignItems: 'center',
         flex: 1
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