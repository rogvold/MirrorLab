/**
 * Created by sabir on 14.02.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import moment from 'moment';

 import * as colors from '../../../constants/AppColors'


 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     ListView,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableOpacity,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import FitImage from 'react-native-fit-image';

 // import CacheableImage from 'react-native-cacheable-image'

import CacheableFitImage from '../../image/CacheableFitImage'

 class PhotosList extends React.Component {

     static defaultProps = {
         photos: [],

         onPhotoClick: (photoId) => {
             if (__DEV__){
                 console.log('onPhotoClick: photoId = ', photoId);
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

     getDataSource = () => {
         let {photos} = this.props;
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {return (r1.id !== r2.id)}});
         return ds.cloneWithRows(photos);
     }

     onPhotoClick = (photoId) => {
         this.props.onPhotoClick(photoId);
     }

     shouldComponentUpdate(nextProps, nextState) {
         if (__DEV__){
             console.log('PhotosList: shouldComponentUpdate occured');
         }
         let oldPhotos = this.props.photos;
         let {photos} = nextProps;
         let res = false;
         if (photos == undefined || oldPhotos == undefined){
             if (__DEV__){
                 console.log('PhotosList: shouldComponentUpdate: returning res = (photos == undefined || oldPhotos == undefined)', true);
             }
             return true;
         }
         if (photos.length != oldPhotos.length){
             if (__DEV__){
                 console.log('PhotosList: shouldComponentUpdate: returning res = (photos.length != oldPhotos.length)', true);
             }
             return true;
         }
         for (let i in photos){
             if (photos[i].url != oldPhotos[i].url){
                 res = true;
             }
         }
         if (__DEV__){
             console.log('PhotosList: shouldComponentUpdate: returning res = ', res);
         }
         return res;
     }

     getPhotoRow = (photo) => {
        return (
            <View style={styles.photo_item}>

                <TouchableOpacity style={{
                                                flex: 1,
                                                flexWrap: 'wrap',
                                                flexDirection:'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}
                                  onPress={this.onPhotoClick.bind(this, photo.id)} >
                    <View style={styles.image_placeholder} >

                        <CacheableFitImage
                            url={photo.url}
                            originalWidth={50}
                            originalHeight={50}
                            style={{borderRadius: 4}}
                        />

                    </View>
                    <View style={styles.info_placeholder} >
                        <Text>
                            {moment(photo.timestamp).format('LLL')}
                        </Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
     }

     render = () => {
         let {photos} = this.props;

         return (
             <ListView
                 dataSource={this.getDataSource()}
                 renderRow={(rowData) => {return this.getPhotoRow(rowData)}}
                 style={styles.container} >
             </ListView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     photo_item: {
         height: 60,
         padding: 5,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder,
         // marginBottom: 10,
         flexDirection: 'row'
     },

     image_placeholder: {
        height: 50,
        width: 50,
        borderRadius: 4,
     },

     info_placeholder: {
        paddingLeft: 5
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

 //PhotosList = connect(mapStateToProps, mapDispatchToProps)(PhotosList)

 export default PhotosList