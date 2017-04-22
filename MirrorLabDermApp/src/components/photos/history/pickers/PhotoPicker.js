/**
 * Created by sabir on 10.03.17.
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

 import moment from 'moment';

 import * as colors from '../../../../constants/AppColors'

 const { width, height } = Dimensions.get('window')

import I18nText from '../../../i18n/I18nText'

 class PhotoPicker extends React.Component {

     static defaultProps = {

         selectedPhotoId: undefined,

         photos: [],

         onChange: (photoId) => {

         }

     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         this.scrollTo(this.props.selectedPhotoId);
     }

     componentWillReceiveProps(nextProps) {
         if (this.props.selectedPhotoId != nextProps.selectedPhotoId){
             this.scrollTo(nextProps.selectedPhotoId);
         }
     }

     getPhotoName = (photoId) => {
         let {photos} = this.props;
     }

     onPress = (photoId) => {
         this.props.onChange(photoId);
     }

     getSelectedNumber = (id) => {
         let {selectedPhotoId, photos} = this.props;
         let res = undefined;
         for (let i in photos){
             if (photos[i].id == id){
                 res = i;
             }
         }
         return res;
     }

     scrollTo = (id) => {
         let {pickerHeight} = this.props;
         pickerHeight = (pickerHeight == undefined) ? 100 : pickerHeight;
         let n = this.getSelectedNumber(id);
         if (n == undefined){
            return;
         }
         let offset = n * ROW_HEIGHT;
         if (n > 0){
             offset = offset - (pickerHeight / 2.0) + (ROW_HEIGHT / 2.0);
         }

         if (this.scrollView == undefined){
             return;
         }
         let {scrollProperties} = this.scrollView;
         if (__DEV__){
             console.log('this.scrollView = ', this.scrollView);
             console.log('offset, n = ', offset, n);
         }

         // let scrollOffset = offset - scrollProperties.visibleLength;

         // this.scrollView.scrollTo(offset, 0);
         // this.scrollView.scrollTo(offset, 0);
         this.scrollView.scrollTo({x: 0, y: offset, animated: true});
     }

     render = () => {
         let {selectedPhotoId, photos} = this.props;


         return (
             <ScrollView style={styles.container} ref={(r) => {this.scrollView = r}} >

                 <View style={styles.containerInner}>

                     {photos.map( (p, k) => {
                         let isSelected = (p.id == selectedPhotoId);
                         let key = 'picker_' + k;
                         let onPress = this.onPress.bind(this, p.id)

                         return (
                             <TouchableOpacity style={isSelected == true ? styles.selectedItem : styles.item}
                                               key={key} onPress={onPress} >

                                 <I18nText style={isSelected == true ? styles.selectedText : styles.text}
                                           name={moment(p.timestamp).format('MMM').toUpperCase()} />

                                 <Text style={{width: 3}} ></Text>

                                 <Text style={isSelected == true ? styles.selectedText : styles.text} >
                                     {moment(p.timestamp).format('D, HH:mm')}
                                 </Text>

                             </TouchableOpacity>
                         )

                     })}

                 </View>

             </ScrollView>
         )
     }

 }

 const ROW_HEIGHT = 30;

 var styles = StyleSheet.create({
     container: {

         flex: 1,

         // backgroundColor: 'pink',



         // position: 'absolute',
         // top: 0,
         // bottom: 0,
         // left: 0,
         // right: 0

         // height: 100,
     },

     containerInner: {
         alignItems: 'center',
         justifyContent: 'center',
         flex: 1
     },

     item: {
         height: ROW_HEIGHT,
         // width: 30,
         // backgroundColor: 'green',
         // width: 0.3 * width,
         alignItems: 'center',
         justifyContent: 'center',
         paddingLeft: 10,
         paddingRight: 10,
         flexDirection: 'row'
     },

     selectedItem: {
        borderRadius: 4,
        backgroundColor: colors.cellBorder,
        height: ROW_HEIGHT,
        // width: 0.3 * width,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
         flexDirection: 'row'
     },

     selectedText: {
         fontWeight: 'bold',
         fontSize: 14,
         textAlign: 'center',
         color: colors.actionText,
     },

     text: {
         fontSize: 12,
         textAlign: 'center',
         color: colors.inactiveText,
     }

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

 //PhotoPicker = connect(mapStateToProps, mapDispatchToProps)(PhotoPicker)

 export default PhotoPicker