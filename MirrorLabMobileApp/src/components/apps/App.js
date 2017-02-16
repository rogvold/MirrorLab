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
     ActivityIndicator
 } from 'react-native';

 import {Button} from 'nachos-ui';

 import AuthPanel from '../auth/panels/AuthPanel'

 import SplashApp from './SplashApp'
 import AuthApp from './AuthApp'

 import SettingsApp from './SettingsApp'
 import IndexApp from './IndexApp'
 import PhotosApp from './PhotosApp'

 import LogoutButton from '../auth/buttons/LogoutButton'

 import IOSNavigationTabBarsPanel from '../navigation/IOSNavigationTabBarsPanel'

 import {Scene, Router} from 'react-native-router-flux';

 import UploadDaemon from '../upload/UploadDaemon'

 class App extends React.Component {

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


     getCurrentTab = () => {
         let {tab} = this.props;
         switch (tab){
             case 'index':
                 return <IndexApp/>
             case 'settings':
                 return <SettingsApp/>
             case 'photos':
                 return <PhotosApp/>

             default:
                 return null;
         }
     }

     render = () => {
         let {loading, initialized, currentUserId} = this.props;

         console.log('rendering App: loading, initialized, currentUserId = ', loading, initialized, currentUserId);


         if (initialized == false){
             return <SplashApp/>
         }

         if (currentUserId == undefined){
             return (
                 <AuthApp />
             );
         }

         return (
             <View style={styles.container} >

                 {this.getCurrentTab()}

                 <IOSNavigationTabBarsPanel />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         backgroundColor: 'green',
         // alignItems: 'center',
         // justifyContent: 'center'
         // paddingTop: 22
     },

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        initialized: state.users.initialized,
        tab: state.navigation.tab
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 App = connect(mapStateToProps, mapDispatchToProps)(App)

 export default App