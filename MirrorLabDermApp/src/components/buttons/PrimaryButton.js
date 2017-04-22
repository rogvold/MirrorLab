/**
 * Created by sabir on 07.04.17.
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

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../constants/AppColors'

 class PrimaryButton extends React.Component {

     static defaultProps = {
         disabled: false,
         onPress: () => {

         }
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

     render = () => {
         let {disabled, onPress} = this.props;

         return (
             <TouchableOpacity
                 onPress={onPress}
                 style={(disabled == false) ? styles.button : styles.disabledButton} >

                 {this.props.children}

             </TouchableOpacity>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     button: {
         backgroundColor: colors.primaryColor,
         height: 40,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center'
     },

     disabledButton: {
         backgroundColor: colors.primaryColor,
         height: 40,
         borderRadius: 20,
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

 //PrimaryButton = connect(mapStateToProps, mapDispatchToProps)(PrimaryButton)

 export default PrimaryButton