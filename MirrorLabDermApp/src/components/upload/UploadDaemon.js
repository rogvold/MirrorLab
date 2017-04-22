/**
 * Created by sabir on 15.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../actions/UploadActions'

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
     ActivityIndicator
 } from 'react-native';

 class UploadDaemon extends React.Component {

     static defaultProps = {
         visible: false
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
         if (__DEV__){
             console.log('UploadDaemon: componentWillReceiveProps occured');
         }
     }

     componentWillUpdate = () => {
         if (__DEV__){
             console.log('UploadDaemon: componentWillUpdate occured');
         }
     }

     componentDidUpdate = (prevProps) => {
        if (__DEV__){
            console.log('UploadDaemon: componentDidUpdate occured');
        }
        let {uploadPhotoFromQueue, queueSet} = prevProps;
        if (!queueSet.isEmpty()){
            uploadPhotoFromQueue();
        }
     }

     render = () => {
         let {visible, uploadPhotoFromQueue, queueSet} = this.props;
         if (__DEV__){
             console.log('UploadDaemon: render');
         }
         // if (queueSet.isEmpty() == false){
         //     uploadPhotoFromQueue();
         // }


         // if (visible == false){
         //     return null;
         // }

         return (
             <View style={styles.container} >

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         width: 0,
         height: 0
     },

 });


 const mapStateToProps = (state) => {
    return {
        queueSet: state.upload.queueSet,
        loadingSet: state.upload.loadingSet,
        photosMap: state.upload.photosMap
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

 UploadDaemon = connect(mapStateToProps, mapDispatchToProps)(UploadDaemon)

 export default UploadDaemon