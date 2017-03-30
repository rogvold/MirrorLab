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

 import * as actions from '../../../actions/UsersActions'

 import UserProfileForm from '../forms/UserProfileForm'

 import * as colors from '../../../constants/AppColors'

import I18nText from '../../i18n/I18nText'

 class UpdateProfilePanel extends React.Component {

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

     onSave = (data) => {
         let {onUpdate} = this.props;
         onUpdate(data);
     }

     render = () => {
         let {user, loading} = this.props;
         if (user == undefined){
             return null;
         }


         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                     <I18nText name={'PROFILE'} style={styles.headerText} />
                 </View>

                 <UserProfileForm
                                    onSave={this.onSave}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                 />

             </View>
         )
     }

 }

 let styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     headerPlaceholder: {
         padding: 10
     },

     headerText: {
         fontWeight: 'bold',
         fontSize: 20,
         color: colors.primaryColor
     }

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        user: state.users.usersMap.get(state.users.currentUserId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (data) => {
            if (data == undefined){
                return Promise.resolve();
            }
            return dispatch(actions.updateUser(data))
        }
    }
 }

 UpdateProfilePanel = connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePanel)

 export default UpdateProfilePanel