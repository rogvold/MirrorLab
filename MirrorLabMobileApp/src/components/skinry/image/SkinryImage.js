/**
 * Created by sabir on 09.03.17.
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

 import SkinrySvgPanel from './SkinrySvgPanel'

 import CacheableFitImage from '../../image/CacheableFitImage'

 class SkinryImage extends React.Component {

     static defaultProps = {
         width: 200,
         height: 300,

         url: 'https://pophaircuts.com/images/2012/12/Audrey-Tautou-Short-Haircuts-for-Curly-Hair.jpg',

         landmarks: [],
         spots: [],
         undereyes: [],

         onClick: () => {
             if (__DEV__){
                 console.log('onClick occured');
             }
         }

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

     getPoints = () => {
         let {landmarks, spots} = this.props;

         let landmarksPoints = landmarks.map((p) => {return Object.assign({}, p, {rx: 0.007, ry: 0.007, fillColor: 'grey', borderColor: 'grey'})});

         let spotsPoints = spots.map((p) => {return Object.assign({}, p, {fillColor: 'rgba(240, 128, 128, 0.6)', borderColor: 'lightcoral'})});;

         let res = landmarksPoints.concat(spotsPoints);

         return res;
     }

     getLandmarksPolylines = () => {
         let {landmarks} = this.props;
         if (landmarks == undefined || landmarks.length == 0){
             return [];
         }

         let res = [];
         let outlinePolyline = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k < 17)})
         };
         let leftEyebrow = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 17 && k <= 21)})
         };
         let rightEyebrow = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 22 && k <= 26)})
         };
         let noseStraight = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 27 && k <= 30)})
         };
         let noseBottom = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 31 && k <= 35)})
         };
         let leftEye = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 36 && k <= 41)}).concat([landmarks[36]])
         };
         let rightEye = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 42 && k <= 47)}).concat([landmarks[42]])
         };
         let extMouth = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 48 && k <= 59)}).concat([landmarks[48]])
         };

         let innerMouth = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 60 && k <= 67)}).concat([landmarks[60]])
         };


         let forehead = {
             name: 'outline',
             color: 'grey',
             lines: landmarks.filter((p, k) => {return (k >= 68 && k <= 70)})
         }

         res.push(outlinePolyline);
         res.push(leftEyebrow);
         res.push(rightEyebrow);

         res.push(noseStraight);
         res.push(noseBottom);
         res.push(leftEye);
         res.push(rightEye);
         res.push(extMouth);
         res.push(innerMouth);

         res.push(forehead);

         return res;
     }

     getUnderEyesPolylines = () => {
         let res = [];
         let {undereyes} = this.props;
         if (undereyes == undefined){
             return [];
         }
         let {pointsLeft, pointsRight} = undereyes;
         pointsLeft = pointsLeft == undefined ? [] : pointsLeft;
         pointsRight = pointsRight == undefined ? [] : pointsRight;

         let left = {
             color: 'blue',
             lines: (pointsLeft.length == 0) ? [] : pointsLeft.concat([pointsLeft[0]])
         }
         let right = {
             color: 'blue',
             lines: (pointsRight.length == 0) ? [] : pointsRight.concat([pointsRight[0]])
         }
         res.push(left);
         res.push(right);
         return res;
     }

     getPolylines = () => {
         let res = [];
         res = res.concat(this.getLandmarksPolylines());
         res = res.concat(this.getUnderEyesPolylines());
         return res;
     }


     render = () => {
         let {width, height, url, points, polylines} = this.props;
         let st = {
             width,
             height,
             backgroundColor: 'pink'
         }

         return (
             <TouchableHighlight style={st} onPress={this.props.onClick} >

                 <View style={{flex: 1}} >

                     <View style={{zIndex: 2, position: 'absolute',
                                   left: 0, right: 0, top: 0, bottom: 0,
                                   backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >

                         <SkinrySvgPanel
                                        width={width}
                                        height={height}
                                        polylines={this.getPolylines()}
                                        points={this.getPoints()}
                                />

                     </View>

                     <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1}} >
                         <CacheableFitImage style={{width: width, height: height}}
                                            originalWidth={width}
                                            originalHeight={height}
                                            url={url}
                                source={{uri: url}} />
                     </View>

                 </View>

             </TouchableHighlight>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });


 export default SkinryImage