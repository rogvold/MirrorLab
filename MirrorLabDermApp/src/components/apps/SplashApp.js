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

 class SplashApp extends React.Component {

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

         return (
             <View style={styles.container} >

                 <View style={styles.splash_image_placeholder} >
                    <Image style={styles.splash_image} source={require('../../assets/images/skinry_splash.png')} />
                 </View>

             </View>
         )
     }

 }



 var styles = StyleSheet.create({
     container: {
         backgroundColor: 'black',
         height: Dimensions.get('window').height,
         width: Dimensions.get('window').width,
         justifyContent: 'center',
         alignItems: 'center'
     },

     splash_image_placeholder: {
         width: 360,
         height: 132
     },

     splash_image:{
        width: 360,
        height: 132
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

 //SplashApp = connect(mapStateToProps, mapDispatchToProps)(SplashApp)

 export default SplashApp