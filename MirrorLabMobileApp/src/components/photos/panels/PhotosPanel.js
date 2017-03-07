/**
 * Created by sabir on 14.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as photosActions from '../../../actions/PhotosActions'

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
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

 import {Spinner} from 'nachos-ui'

import PhotosList from '../list/PhotosList'

 class PhotosPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         let {currentUserId, loadUserPhotos} = this.props;
         loadUserPhotos(currentUserId);
     }

     componentWillReceiveProps() {

     }

     render = () => {
         let {loading, photos} = this.props;

         return (
             <ScrollView style={styles.container} >

                 {loading == false ? null :
                     <View style={{alignItems: 'center', justifyContent: 'center', height: 30}} >
                         <Spinner />
                     </View>}

                 <PhotosList photos={photos} />


             </ScrollView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // alignSelf: 'stretch',
         marginBottom: 25
     },

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
        currentUserId: state.users.currentUserId,
        loading: state.users.loading || state.photos.loading,
        photos: getPhotos_(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        loadUserPhotos: (userId) => {
            return dispatch(photosActions.loadUserPhotos(userId))
        }
    }
 }

 PhotosPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosPanel)

 export default PhotosPanel