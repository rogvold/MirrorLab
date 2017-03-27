/**
 * Created by sabir on 10.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
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

import CacheableFitImage from '../../image/CacheableFitImage'

 class SkinryToggableImage extends React.Component {

     static defaultProps = {

         width: 200,
         height: 300,

         url: 'https://pophaircuts.com/images/2012/12/Audrey-Tautou-Short-Haircuts-for-Curly-Hair.jpg',

         landmarks: [],
         spots: [],
         undereyes: [],

         showSkinry: true

     }

     static propTypes = {}

     state = {
         mode: 0
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onClick = () => {
         if (__DEV__){
             console.log('click click');
         }
         let {mode} = this.state;
         let newMode = (+mode + 1) % 5;
         this.setState({
             mode: newMode
         });
     }

     getDataProps = () => {
         let {landmarks, spots, undereyes} = this.props;
         let {mode} = this.state;
         if (__DEV__){
             console.log('getDataProps: mode = ', mode);
         }

         switch (mode){
             case 0:
                 return {landmarks: landmarks, spots: spots, undereyes: undereyes}
             case 1:
                 return {landmarks: [], spots: [], undereyes: []}
             case 2:
                 return {landmarks: landmarks, spots: [], undereyes: []}
             case 3:
                 return {landmarks: [], spots: spots, undereyes: []}
             case 4:
                 return {landmarks: [], spots: [], undereyes: undereyes}
         }
     }

     render = () => {
         let {width, height, url, showSkinry} = this.props;
         let {landmarks, spots, undereyes} = this.getDataProps();

         if (showSkinry == true){
             return (
                 <SkinryImage width={width} height={height} url={url}
                              landmarks={landmarks}
                              undereyes={undereyes}
                              spots={spots}
                              onClick={this.onClick}
                 />
             )
         }
         return (
             <CacheableFitImage style={{width: width, height: height}}
                                originalWidth={width}
                                originalHeight={height}
                                url={url}
                                source={{uri: url}} />
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

 //SkinryToggableImage = connect(mapStateToProps, mapDispatchToProps)(SkinryToggableImage)

 export default SkinryToggableImage