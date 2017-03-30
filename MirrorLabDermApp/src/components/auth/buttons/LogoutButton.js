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
     TouchableOpacity
 } from 'react-native';

 import ReactNative from 'react-native';

 import {Button} from 'nachos-ui'

 import * as colors from '../../../constants/AppColors'

 import I18nText from '../../i18n/I18nText'

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
             <TouchableOpacity style={styles.logoutButton} onPress={this.onSubmit} >
                 <I18nText name={'LOGOUT'}  style={{color: 'white', fontSize: 16}} />
             </TouchableOpacity>
         )

     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     logoutButton: {
         backgroundColor: colors.primaryColor,
         padding: 5,
         height: 40,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center'
     }

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