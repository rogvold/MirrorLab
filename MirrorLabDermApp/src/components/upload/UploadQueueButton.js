/**
 * Created by sabir on 06.04.17.
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

 import * as actions from '../../actions/UploadActions'

 class UploadQueueButton extends React.Component {

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
         let {uploadPhotoFromQueue, hasSomethingToUpload} = this.props;

         return (
             <TouchableOpacity style={styles.container} onPress={() => {if (hasSomethingToUpload == true) {
                                                                                uploadPhotoFromQueue()
                                                                            }
                    }} >
                <Text style={{textAlign: 'center', color: 'white'}} >
                    upload photos from queue
                </Text>
             </TouchableOpacity>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         height: 50,
         borderRadius: 25,
         backgroundColor: 'blue',
         justifyContent: 'center',
         padding: 5,
         alignItems: 'center'
     },

 });



 const mapStateToProps = (state) => {
    return {
        hasSomethingToUpload: !state.upload.queueSet.isEmpty()
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        uploadPhotoFromQueue: () => {
            if (__DEV__){
                console.log('uploadPhotoFromQueue occured');
            }
            return dispatch(actions.uploadPhotoFromQueue())
        }
    }
 }

 UploadQueueButton = connect(mapStateToProps, mapDispatchToProps)(UploadQueueButton)

 export default UploadQueueButton