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

 import SkinryUserImage from '../../../skinry/image/SkinryUserImage'

 const { width, height } = Dimensions.get('window')

const pW = width / 2.0 - 10;
const pH = (height / width) * pW;

 import moment from 'moment'


 const Item = Picker.Item;

 import PhotoPicker from '../pickers/PhotoPicker'

 import * as colors from '../../../../constants/AppColors'

 import CacheableFitImage from '../../../image/CacheableFitImage'

 class PhotosComparePanel extends React.Component {

     static defaultProps = {
         showSkinry: true
     }

     static propTypes = {
         photos: PropTypes.array.isRequired
     }



     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         let {photos} = this.props;
         this.state = {
             firstPhotoId: (photos == undefined || photos.length == 0) ? undefined : photos[0].id,
             secondPhotoId: (photos == undefined || photos.length == 0) ? undefined : photos[photos.length - 1].id,
         }
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     getPhotoName = (photoId) => {
         let {photos} = this.props;
         let daysMap = {};
         //todo: finish this shit
     }

     getPicker = (selectedValue, onValueChange) => {
         let {photos} = this.props;
         if (photos == undefined || photos.length == 0){
             return null;
         }

         return (
             <View>
                 {photos.map( (p, k) => {
                     let key = 'picker_photo_' + k;
                     let onPress = () => {
                         onValueChange(p.id);
                     }
                     let isSelected = (selectedValue == p.id);
                     let st = {};
                     return (
                         <TouchableOpacity key={key} onPress={onPress} >
                             <Text style={(isSelected == true) ? {fontWeight: 'bold'} : {}} >
                                 {moment(p.timestamp).format('LLL')}
                             </Text>
                         </TouchableOpacity>
                     );
                 })}

             </View>
         )
     }

     getPhotoById = (id) => {
         let {photos} = this.props;
         let res = undefined;
         for (let i in photos){
             let p = photos[i];
             if ((p.id) == id){
                 res = p;
             }
         }
         return res;
     }

     render = () => {
         let {firstPhotoId, secondPhotoId} = this.state;
         let {photos, showSkinry} = this.props;
         let firstPhoto = this.getPhotoById(firstPhotoId);
         let secondPhoto = this.getPhotoById(secondPhotoId);

         if (__DEV__){
             console.log('PhotosComparePanel: firstPhotoId, secondPhotoId = ', firstPhotoId, secondPhotoId);
         }

         return (
             <View style={styles.container} >

                 <View style={styles.topPlaceholder}>

                     <View style={styles.leftPlaceholder}>

                         {firstPhotoId == undefined ? <View><Text>no photos</Text></View> :
                            <CacheableFitImage
                                url={firstPhoto.url}
                                style={{width: pW, height: pH}}
                                originalWidth={pW} originalHeight={pH} />
                         }

                     </View>

                     <View style={styles.rightPlaceholder}>

                         {secondPhotoId == undefined ? <View><Text>no photos</Text></View> :
                             <CacheableFitImage
                                 url={secondPhoto.url}
                                 style={{width: pW, height: pH}}
                                 originalWidth={pW} originalHeight={pH} />
                         }

                     </View>

                 </View>


                 {secondPhotoId == undefined || firstPhotoId == undefined ? null :
                     <View style={styles.middlePlaceholder} >

                         <View style={styles.leftPickerPlaceholder} >
                             <PhotoPicker selectedPhotoId={firstPhotoId}
                                          photos={photos}
                                          pickerHeight={100}
                                          onChange={(id) => {this.setState({firstPhotoId: id});}} />
                         </View>

                         <View style={styles.rightPickerPlaceholder} >
                             <PhotoPicker selectedPhotoId={secondPhotoId}
                                          photos={photos}
                                          pickerHeight={100}
                                          onChange={(id) => {this.setState({secondPhotoId: id});}} />
                         </View>

                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     topPlaceholder: {
         // flex: 1,
         flexWrap: 'wrap',
         flexDirection:'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: width,
         height: pH + 10,
         marginTop: 10
     },

     leftPlaceholder: {
        width: width / 2.0,
        // backgroundColor: 'pink',
         padding: 5,
         alignItems: 'center'
     },

     rightPlaceholder: {
         width: width / 2.0,
         // backgroundColor: 'yellow',
         padding: 5,
         alignItems: 'center'
     },

     middlePlaceholder: {
         // height: height / 10,
         height: 100,
         width: width,
         // backgroundColor: 'wheat',

         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder,

         flexWrap: 'wrap',
         flexDirection:'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
     },

     leftPickerPlaceholder: {
         // height: 100,
         width: width / 2.0,
         // backgroundColor: 'red'
     },

     rightPickerPlaceholder: {
         width: width / 2.0,
         // height: 100,
     }

 });

let getPhotos_ = (state) => {
    let {currentUserId} = state.users;
    let photos = state.photos.photosMap.toArray().filter((p) => {return (p.userId == currentUserId)}).sort(
        (a, b) => {
            return (b.timestamp - a.timestamp)
        }
    );
    return photos;
}

 const mapStateToProps = (state) => {
    return {
        photos: getPhotos_(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 PhotosComparePanel = connect(mapStateToProps, mapDispatchToProps)(PhotosComparePanel)

 export default PhotosComparePanel