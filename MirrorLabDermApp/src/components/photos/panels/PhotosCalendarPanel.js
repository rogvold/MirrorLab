/**
 * Created by sabir on 17.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import moment from 'moment'
 
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

 import CalendarPanel from '../../calendar/CalendarPanel'

 import * as colors from '../../../constants/AppColors'

import CacheableFitImage from '../../image/CacheableFitImage'
 
 class PhotosCalendarPanel extends React.Component {
 
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

     onDayClick = (t) => {
         if (__DEV__){
             console.log('onDayClick: t = ', t);
         }
         let {getPhotosByTimestamp} = this.props;
         let photos = getPhotosByTimestamp(t);
         if (photos.length == 0){
             return;
         }

         if (+moment(t).startOf('day') == +moment(this.state.selectedTimestamp).startOf('day')){
             this.setState({
                 selectedTimestamp: undefined
             });
             return;
         }
         this.setState({
             selectedTimestamp: t
         });
     }

     selectedContentFunction = () => {
         let {getPhotosByTimestamp} = this.props;
         let {selectedTimestamp} = this.state;
         if (selectedTimestamp == undefined){
             return null;
         }
         let photos = getPhotosByTimestamp(selectedTimestamp);
         return (
             <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
                 {photos.map( (p, k) => {
                     let key = k+ '_' + p.id;
                     return (
                         <View style={styles.photoItem} key={key} >
                             <View style={styles.imagePlaceholder} >
                                 <CacheableFitImage url={p.url}
                                                    originalWidth={40}
                                                    originalHeight={60}
                                                    style={{
                                                        height: 60,
                                                        width: 40,
                                                        borderRadius: 4
                                                    }} />
                             </View>
                         </View>
                     )
                 } )}
             </ScrollView>
         )
     }

     contentFunction = (t) => {
         let {getPhotosByTimestamp} = this.props;
         let photos = getPhotosByTimestamp(t);
         if (photos == undefined || photos.length == 0){
             return null;
         }
         let s = '';
         s = photos.map(p => '.').join('');
         if (photos.length > 3){
             s = '___';
         }

         return (
             <View>
                 <Text style={{textAlign: 'center', color: colors.primaryColor, fontWeight: 'bold'}} >
                     {s}
                 </Text>
             </View>
         )
     }
 
     render = () => {
         let {selectedTimestamp} = this.state;
 
         return (
             <View style={styles.container} >

                 <CalendarPanel
                     selectedTimestamp={selectedTimestamp}
                     contentFunction={this.contentFunction}
                     selectedContentFunction={this.selectedContentFunction}
                     onDayClick={this.onDayClick} />

             </View>
         )
     }
 
 }
 
 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     bubble: {
         width: 4,
         height: 4,
         borderRadius: 3,
         margin: 2,
         backgroundColor: colors.messengerColor
     },

     photoItem: {
         height: 60,
         padding: 5,
         // marginBottom: 10,
         flexDirection: 'row'
     },

     imagePlaceholder: {
         // height: 50,
         // width: 50,
         // borderRadius: 4,
         margin: 5,
     },

     imageStyle: {
         height: 60,
         width: 40,
         borderRadius: 4
     }
 
 });

 let getPhotosByDayTimestamp = (state, timestamp) => {
     let {photosMap} = state.photos;
     let from = +moment(timestamp).startOf('day')
     let to = +moment(timestamp).endOf('day');
     let photos = photosMap.toArray().filter((p) => {
         return (
             (p.timestamp > from && p.timestamp < to)
         )
     })
     return photos;
 }
 
 const mapStateToProps = (state) => {
    return {
        getPhotosByTimestamp: (timestamp) => {
            return getPhotosByDayTimestamp(state, timestamp)
        }
    }
 }
 
 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }
 
 PhotosCalendarPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosCalendarPanel)
 
 export default PhotosCalendarPanel
