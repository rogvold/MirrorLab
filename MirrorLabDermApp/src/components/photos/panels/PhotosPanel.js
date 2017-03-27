/**
 * Created by sabir on 14.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as photosActions from '../../../actions/PhotosActions'

 import CommentsPanel from '../../comments/panels/CommentsPanel'

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
     TouchableOpacity,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
     Dimensions
 } from 'react-native';

 import {Spinner} from 'nachos-ui'

import PhotosList from '../list/PhotosList'

 import SkinryUserImage from '../../skinry/image/SkinryUserImage'
 import PhotoAnalysisPanel from '../../skinry/panels/PhotoAnalysisPanel'

 import * as colors from '../../../constants/AppColors'

 import moment from 'moment'

 import Icon from 'react-native-vector-icons/FontAwesome'

 const { width, height } = Dimensions.get('window')

import KeyboardSpacer from 'react-native-keyboard-spacer';


 class PhotosPanel extends React.Component {

     static defaultProps = {
         commentsEnabled: true
     }

     static propTypes = {}

     state = {
         selectedPhotoId: undefined
     }

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

     onPhotoClick = (photoId) => {
         this.setState({
             selectedPhotoId: photoId
         });
     }

     getSelectedPhoto = () => {
         let {photos} = this.props;
         let {selectedPhotoId} = this.state;
         let res = undefined;
         for (let i in photos){
             if (photos[i].id == selectedPhotoId){
                 res = photos[i];
             }
         }
         return res;
     }

     getCurrentNumber = () => {
        let {photos} = this.props;
        let {selectedPhotoId} = this.state;
        let n = -1;
        for (let i in photos){
            if (photos[i].id == selectedPhotoId){
                n = i;
            }
        }
        return n;
     }

     onPrev = () => {
        let n = this.getCurrentNumber();

        let {photos} = this.props;
        if (n > 0){
            this.setState({
                selectedPhotoId: photos[n - 1].id
            });
        }
     }

     onNext = () => {
         let n = this.getCurrentNumber();
         if (__DEV__){
             console.log('onNext: n = ', n);
         }
         let {photos} = this.props;
         if (+n < photos.length - 1){
             this.setState({
                 selectedPhotoId: photos[+n + 1].id
             });
         }
     }


     render = () => {
         let {loading, photos, commentsEnabled} = this.props;
         let {selectedPhotoId} = this.state;
         let selectedPhoto = this.getSelectedPhoto();
         let currentNumber = this.getCurrentNumber();

         return (
             <View style={styles.container} >

                 {loading == false ? null :
                     <View style={{alignItems: 'center', justifyContent: 'center', height: 30}} >
                         <Spinner />
                     </View>}

                 <PhotosList photos={photos} onPhotoClick={this.onPhotoClick} />

                 <Modal
                     animationType={'slide'}
                     transparent={this.state.transparent}
                     visible={(selectedPhotoId != undefined)}
                     onRequestClose={() => {this.setState({selectedPhotoId: undefined})}}
                 >

                     {selectedPhotoId == undefined ? null :
                         <View style={styles.modalInner} >

                             <View style={styles.modalHeader} >

                                 <TouchableOpacity style={styles.headerBackPlaceholder} onPress={() => {this.setState({selectedPhotoId: undefined})}} >
                                     <Text style={styles.backButton} >
                                         <Icon name="chevron-left" color={colors.messengerColor} size={16} style={{marginRight: 5}} />
                                         Back
                                     </Text>
                                 </TouchableOpacity>

                                 <View style={styles.selectedUserPlaceholder} >
                                     <Text style={styles.selectedUserText}>
                                         {moment(selectedPhoto.timestamp).format('LLL')}
                                     </Text>
                                 </View>

                             </View>

                             <ScrollView style={styles.modalContent} >

                                 <PhotoAnalysisPanel
                                     showSkinry={false}
                                     canPrev={+currentNumber > 0}
                                     canNext={+currentNumber < photos.length - 1}
                                     photoId={selectedPhotoId}
                                     onPrev={this.onPrev} onNext={this.onNext} />

                                 {commentsEnabled == false ? null :
                                    <CommentsPanel relatedId={selectedPhotoId} />
                                 }



                             </ScrollView>


                         </View>
                     }

                 </Modal>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // alignSelf: 'stretch',
         marginBottom: 25
     },

     modalInner: {
         flex: 1,
         backgroundColor: 'whitesmoke'
     },

     modalHeader: {
         height: 40,
         backgroundColor: 'white',
         // borderBottomWidth: 1,
         // borderBottomColor: 'grey',
         padding: 10,

         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
         // justifyContent: 'center',
         // alignItems: 'center'
     },

     headerBackPlaceholder: {
         width: width / 6,
         // backgroundColor: 'yellow'
     },

     backButton: {
         color: colors.messengerColor,
         fontSize: 16
     },

     selectedUserPlaceholder: {
         width: width * 2 / 3,
         // backgroundColor: 'pink'
     },

     selectedUserText: {
         textAlign: 'center',
         color: colors.inactiveText,
         fontSize: 16
     },

     modalContent: {
         height: height - 40,
         width: width,
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