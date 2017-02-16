/**
 * Created by sabir on 15.02.17.
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
     ActivityIndicator
 } from 'react-native';

 import {Button} from 'nachos-ui';

 import FitImage from 'react-native-fit-image';

 import * as actions from '../../../actions/UploadActions'

 class PhotoUploadPanel extends React.Component {

     static defaultProps = {
         localPhotoUri: undefined,
         onStartedUploading: () => {
             if (__DEV__){
                 console.log('default: onStartedUploading occured');
             }
         }
     }

     static propTypes = {

     }

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onUpload = () => {
         let {localPhotoUri, onStartedUploading} = this.props;
         this.props.addToQueue(localPhotoUri).then(
             () => {
                 onStartedUploading();
             }
         );
     }

     render = () => {
         let {localPhotoUri} = this.props;
         if (localPhotoUri == undefined){
             return null;
         }

         return (
             <View style={styles.container} >

                 <View style={styles.image_preview_placeholder} >
                     <FitImage source={{uri: localPhotoUri}}
                               style={styles.local_image} />
                 </View>


                 <View style={styles.submit_button_placeholder} >
                     <Button iconName={'md-cloud-upload'} onPress={this.onUpload} >
                         Upload
                     </Button>
                 </View>


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         alignItems: 'center',
         justifyContent: 'flex-start',
         height: 255,
         // backgroundColor: 'yellow',
         alignSelf: 'center'
     },

     image_preview_placeholder: {
         height: 200,
         width: 150,
         borderRadius: 4,
         // backgroundColor: 'red'
         // flex: 1
     },

     local_image: {
         borderRadius: 4,
         height: 200,
         width: 150,
     },

     submit_button_placeholder: {
        marginTop: 5,
        // flex: 1,
         height: 50,
         // backgroundColor: 'pink'
     }

 });


 const mapStateToProps = (state) => {
    return {

    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        addToQueue: (url) => {
            return dispatch(actions.addToQueue([url]))
        }
    }
 }

 PhotoUploadPanel = connect(mapStateToProps, mapDispatchToProps)(PhotoUploadPanel)

 export default PhotoUploadPanel