/**
 * Created by sabir on 28.03.17.
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

 import TakePhotoPanel from '../photos/panels/TakePhotoPanel'

 import * as uploadActions from '../../actions/UploadActions'

 import * as navigationActions from '../../actions/NavigationActions'

 class TakePhotoApp extends React.Component {

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

     onSubmit = (uri) => {
         let {addToQueue, closeCamera} = this.props;
         addToQueue(uri).then(
             () => closeCamera()
         )
         // closeCamera().then(
         //     () => addToQueue(uri)
         // )
     }

     render = () => {
         let {cameraEnabled} = this.props;

         return (
             <View style={styles.container} >
                 <TakePhotoPanel onSubmit={this.onSubmit} />
             </View>
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
        cameraEnabled: state.navigation.camera
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        addToQueue: (url) => {
            return dispatch(uploadActions.addToQueue([url]))
        },
        closeCamera: () => {
            return dispatch(navigationActions.closeCamera())
        }
    }
 }

 TakePhotoApp = connect(mapStateToProps, mapDispatchToProps)(TakePhotoApp)

 export default TakePhotoApp