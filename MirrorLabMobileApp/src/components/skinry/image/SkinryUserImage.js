/**
 * Created by sabir on 09.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     LayoutAnimation,
     AppRegistry,
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

 import SkinryImage from './SkinryImage'

 class SkinryUserImage extends React.Component {

     static defaultProps = {
         // photoId: undefined
         photoId: 'QP2EzjwH2O',

         photoWidth: 200

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
         let {photo, photoWidth} = this.props;

         if (__DEV__){
             console.log('rendering SkinryUserImage: photo = ', photo);
         }

         if (photo == undefined || photo.data == undefined || photo.data.imgInfo == undefined){
             return null;
         }

         let {height, width} = photo.data.imgInfo;

         let w = photoWidth;
         let h = (1.0 * height / width) * w;

         return (
             <SkinryImage
                          width={w}
                          height={h}
                          landmarks={photo.data.imgInfo.landmarksXY} url={photo.url}
                          undereyes={photo.data.undereyes}
                          spots={photo.data.spots}
             />
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });

 let getPhoto = (state, photoId) => {
     let {photosMap} = state.photos;
     if (__DEV__){
         console.log('getPhoto: photoId = ' + photoId);
     }

     return photosMap.get(photoId);
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        photo: getPhoto(state, ownProps.photoId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 SkinryUserImage = connect(mapStateToProps, mapDispatchToProps)(SkinryUserImage)

 export default SkinryUserImage