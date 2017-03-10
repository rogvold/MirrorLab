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

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    // Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

 class SkinrySvgPanel extends React.Component {

     static defaultProps = {
         width: 200,
         height: 300,

         points: [
             {
                 x: 0.1,
                 y: 0.1,
                 rx: 0.05,
                 ry: 0.05,
                 fillColor: 'red',
                 borderColor: 'black'
             },
             {
                 x: 0.3,
                 y: 0.2,
                 rx: 0.05,
                 ry: 0.05,
                 fillColor: 'red',
                 borderColor: 'black'
             },
             {
                 x: 0.2,
                 y: 0.6,
                 rx: 0.05,
                 ry: 0.05,
                 fillColor: 'red',
                 borderColor: 'black'
             },
         ],

         polylines: [
             {
                 name: 'line 1',
                 color: 'blue',
                 lines: [{
                     x: 0.1,
                     y: 0.13
                 }, {
                     x: 0.12,
                     y: 0.5
                 }, {
                     x: 0.9,
                     y: 0.7
                 }]
             },
             {
                 name: 'line 2',
                 color: 'green',
                 lines: [{
                     x: 0.06,
                     y: 0.23
                 }, {
                     x: 0.42,
                     y: 0.59
                 }, {
                     x: 0.29,
                     y: 0.47
                 }]
             }
         ]

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
         let {points} = this.props;
         let {width, height} = this.props;


         return points.map( (p, k) => {
             let key = 'circle_' + k;
             // let r = Math.max(Math.min((+p.rx) * (+width), (+p.ry) * (+height)), 0);
             // let r = Math.max((+p.rx) * (+width), 0);
             let r = Math.max((+p.rx / 2.0) * (+width), 0);

             return (
                 <Circle key={k}
                         cx={(+p.x) * (+width)}
                         cy={(+p.y) * (+height)}
                         r={r}
                         fill={p.fillColor}
                         stroke={p.borderColor}
                         strokeWidth={1}
                 />
             )
         })
     }

     getPolylines = () => {
         let {polylines} = this.props;
         let {width, height} = this.props;
         if (polylines == undefined){
             polylines = [];
         }

         return polylines.map( (p, k) => {
             let key = 'polyline_' + k;
             let r = Math.min((+p.rx) * (+width), (+p.ry) * (+height));
             let arr = [];
             for (var i in p.lines){
                 let po = p.lines[i];
                 if (po == undefined){
                     continue;
                 }
                 arr.push((+po.x) * (+width));
                 arr.push((+po.y) * (+height));
             }
             let pointsString = arr.join(',');
             if (arr.length == 0){
                 return null;
             }
             return (
                 <G key={key} >
                     <Polyline
                         points={pointsString}
                         fill="none"
                         stroke={p.color}
                         strokeWidth={2}
                     />
                 </G>
             )
         })
     }

     render = () => {
         let {width, height} = this.props;

         return (
             <Svg
                 height={height}
                 width={width}
             >

                 {this.getPoints()}

                 {this.getPolylines()}

             </Svg>
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

 //SkinrySvgPanel = connect(mapStateToProps, mapDispatchToProps)(SkinrySvgPanel)

 export default SkinrySvgPanel