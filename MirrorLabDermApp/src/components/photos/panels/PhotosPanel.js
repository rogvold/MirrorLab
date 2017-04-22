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
     Dimensions,
     Keyboard
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

 import I18nText from '../../i18n/I18nText'

 class PhotosPanel extends React.Component {

     static defaultProps = {
         commentsEnabled: true,
         onPhotoClick: (id) => {

         }
     }

     static propTypes = {}

     state = {

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
         this.props.onPhotoClick(photoId);
     }

     render = () => {
         let {loading, photos, commentsEnabled} = this.props;
         let {selectedPhotoId, keyboardVisible} = this.state;

         if (__DEV__){
             console.log('selectedPhotoId = ', selectedPhotoId);
         }

         return (
             <View style={styles.container} >

                 {loading == false ? null :
                     <View style={{alignItems: 'center', justifyContent: 'center', height: 30}} >
                         <Spinner />
                     </View>}
                 <PhotosList photos={photos} onPhotoClick={this.onPhotoClick} />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // alignSelf: 'stretch',
         // marginBottom: 25
         marginBottom: 40
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
         color: colors.fbColor,
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