/**
 * Created by sabir on 17.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     Dimensions,
     View,
     ListView,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
     Button
 } from 'react-native';

 // import {Button} from 'nachos-ui'

 class MyButton extends React.Component {

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

     render = () => {
         let isIOS = (Platform.OS === 'ios');
         if (isIOS == true){
             return (
                 <Button {...this.props}>
                     {this.props.children}
                 </Button>
             )
         }

         return (
             <TouchableHighlight {...this.props} >
                 {this.props.children}
             </TouchableHighlight>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

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

 //MyButton = connect(mapStateToProps, mapDispatchToProps)(MyButton)

 export default MyButton