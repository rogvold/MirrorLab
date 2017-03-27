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

 import ImageSlider from 'react-native-image-slider';
 import {Spinner} from 'nachos-ui'

 import FitImage from 'react-native-fit-image';

 import Swiper from 'react-native-swiper'

 import CacheableFitImage from '../../image/CacheableFitImage'

 class PhotosSlider extends React.Component {

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
         let {loading, photos} = this.props;
         let urls = photos.map((p) => {return p.url})

         return (
             <View style={styles.container} >

                 <Swiper>
                     {photos.map( (p, k) => {
                         let key = 'photo_' + k + '_' + p.url;

                         return (
                             <View key={key} style={styles.photo_item} >
                                 <CacheableFitImage url={p.url}
                                           style={{
                                                height: Dimensions.get('window').height,
                                                width: Dimensions.get('window').width
                                           }} />
                             </View>
                         )

                     } )}
                 </Swiper>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // flexGrow: 1,
     },

     photo_item: {
         // height: 200,
         height: Dimensions.get('window').height,
         width: Dimensions.get('window').width
     },

     local_image: {
         // height: 200,

     }

 });

let getPhotos_ = (state) => {
    let {currentUserId} = state.users;
    if (__DEV__){
        console.log('getPhotos_: state = ', state);
    }
    let photos = state.photos.photosMap.toArray().filter((p) => {return (p.userId == currentUserId)}).sort(
        (a, b) => {
            return (b.timestamp - a.timestamp)
        }
    );
    return photos;
}

 const mapStateToProps = (state) => {
    return {
        loading: state.photos.loading,
        photos: getPhotos_(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 PhotosSlider = connect(mapStateToProps, mapDispatchToProps)(PhotosSlider)

 export default PhotosSlider


// oraportaldba@yahoo.com
// Juniper1324