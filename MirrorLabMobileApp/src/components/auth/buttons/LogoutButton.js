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

 import {Button} from 'nachos-ui'

 class LogoutButton extends React.Component {

     static defaultProps = {
         loadingText: 'Logging out'
     }

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

     onSubmit = () => {
         this.props.onLogout();
     }

     render = () => {
         let {buttonName, loading, loadingText} = this.props;

         return (
             <Button onPress={this.onSubmit} disabled={loading}>
                 {loading == true ?
                     loadingText : buttonName
                 }
             </Button>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        }
    }
 }

 LogoutButton = connect(mapStateToProps, mapDispatchToProps)(LogoutButton)

 export default LogoutButton