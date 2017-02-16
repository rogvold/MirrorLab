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
                                 <FitImage source={{uri: p.url}}
                                           style={styles.local_image} />
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
         height: Dimensions.get('window').height,
         width: Dimensions.get('window').width
     }

 });

let getPhotos_ = (state) => {
    let map = state.photos.photosMap;
    let arr = [];
    for (var key in map){
        arr.push(map[key]);
    }
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp);
    });
    return arr;
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