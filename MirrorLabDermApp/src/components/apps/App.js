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
     StatusBar
 } from 'react-native';

 import {Button} from 'nachos-ui';

 import AuthPanel from '../auth/panels/AuthPanel'

 import SplashApp from './SplashApp'
 import AuthApp from './AuthApp'

 import SettingsApp from './SettingsApp'
 import IndexApp from './IndexApp'
 import PhotosApp from './PhotosApp'
 import DevApp from './DevApp'
 import ChatApp from './ChatApp'
 import DoctorsApp from './DoctorsApp'
 import TakePhotoApp from './TakePhotoApp'
 import InfoApp from './InfoApp'

 import LogoutButton from '../auth/buttons/LogoutButton'

 import IOSNavigationTabBarsPanel from '../navigation/IOSNavigationTabBarsPanel'
 import DermaNavigationTabBarsPanel from '../navigation/DermaNavigationTabBarsPanel'

 import {Scene, Router} from 'react-native-router-flux';

 import UploadDaemon from '../upload/UploadDaemon'

 import KeyboardSpacer from 'react-native-keyboard-spacer';

import ReactNativeI18n from 'react-native-i18n'
const deviceLocale = ReactNativeI18n.locale



 class App extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         if (__DEV__){
             console.log('App: componentDidMount: deviceLocale = ', deviceLocale);
         }
     }

     componentWillReceiveProps() {

     }

     componentWillMount() {
         StatusBar.setHidden(true);
     }


     getCurrentTab = () => {
         let {tab, camera} = this.props;
         if (camera == true){
             return <TakePhotoApp />
         }
         switch (tab){
             case 'index':
                 return <IndexApp/>
             case 'settings':
                 return <SettingsApp/>
             case 'photos':
                 return <PhotosApp/>
             case 'doctors':
                 return <DoctorsApp/>
             case 'chat':
                 return <ChatApp />
             case 'info':
                 return <InfoApp />

             default:
                 return null;
         }
     }

     render = () => {
         let {loading, initialized, currentUserId, camera} = this.props;

         console.log('rendering App: loading, initialized, currentUserId = ', loading, initialized, currentUserId);


         if (initialized == false){
             return <SplashApp/>
         }

         if (currentUserId == undefined){
             return (
                 <AuthApp />
             );
         }

         if (camera == true){
             return <TakePhotoApp/>
         }

         return (
             <View style={styles.container} >

                 <StatusBar hidden={true} translucent={true} />

                 <View style={styles.tabPlaceholder} >
                     {this.getCurrentTab()}
                 </View>



                 <DermaNavigationTabBarsPanel />

                 {true == true ? null :
                     <IOSNavigationTabBarsPanel />
                 }

                 <UploadDaemon />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         // backgroundColor: 'green',
         // alignItems: 'center',
         // justifyContent: 'center'
         // paddingTop: 22
         flex: 1
     },

     tabPlaceholder: {
         paddingBottom: 50,
         flex: 1
     }

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        initialized: state.users.initialized,
        tab: state.navigation.tab,
        camera: state.navigation.camera
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 App = connect(mapStateToProps, mapDispatchToProps)(App)

 export default App