/**
 * Created by sabir on 07.04.17.
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
     ActivityIndicator,
     Keyboard
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../../constants/AppColors'

 let {width, height} = Dimensions.get('window');

 import moment from 'moment'

 import I18nText from '../../i18n/I18nText'

 import CommentsPanel from '../../comments/panels/CommentsPanel'

 // import PhotoAnalysisPanel from '../../'

 import PhotoAnalysisPanel from '../../skinry/panels/PhotoAnalysisPanel'

 import KeyboardSpacer from 'react-native-keyboard-spacer';

 class PhotoViewPanel extends React.Component {

     static defaultProps = {
         onClose: () => {
             if (__DEV__){
                 console.log('onClose occured');
             }
         },
         commentsEnabled: true,
         onPhotoSelect: (newPhotoId) => {
             console.log('onPhotoSelect: newPhotoId = ', newPhotoId);
         }
     }

     static propTypes = {}

     state = {
         keyboardVisible: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     componentWillMount() {
         this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
         this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
     }

     componentWillUnmount () {
         this.keyboardDidShowListener.remove();
         this.keyboardDidHideListener.remove();
     }

     _keyboardDidShow = () => {
         // this.refs.scrollView.scrollTo({y: height / 2 + 200, animated: true});
         this.refs.scrollView.scrollToEnd();
         this.setState({
             keyboardVisible: true
         });
     }

     _keyboardDidHide = () => {
         this.setState({
             keyboardVisible: false
         });
     }

     onPrev = () => {
         let {photos, onPhotoSelect} = this.props;
         let n = this.getCurrentPhotoNumber();
         if (n == undefined || n == 0){
             return;
         }
         let k = +n - 1;
         if (__DEV__){
             console.log('onPrev: k = ', k);
         }
         onPhotoSelect(photos[k].id);
     }

     onNext = () => {
         let {photos, onPhotoSelect} = this.props;
         let n = this.getCurrentPhotoNumber();
         if (n == undefined || n == photos.length -1){
             return;
         }
         let k = +n + 1;
         if (__DEV__){
             console.log('onNext: k = ', k);
         }
         onPhotoSelect(photos[k].id);
     }

     getCurrentPhotoNumber = () => {
         let {photos, id} = this.props;
         let res = undefined;
         for (let i in photos){
             if (photos[i].id == id){
                 res = i;
             }
         }
         return res;
     }

     render = () => {
         let {photos, selectedPhoto, onClose, commentsEnabled, id} = this.props;
         if (photos.length == 0 || selectedPhoto == undefined){
             return null;
         }
         let canPrev = (photos[0].id != selectedPhoto.id);
         let canNext = (photos[photos.length - 1].id != selectedPhoto.id);


         return (
             <View style={styles.container} >

                 <View style={styles.modalHeader} >

                     <TouchableOpacity style={styles.headerBackPlaceholder} onPress={() => {onClose()}} >
                         <View style={{flexDirection: 'row', alignItems: 'center'}} >
                             <Text style={styles.backButton} >
                                 <Icon name="chevron-left" color={colors.fbColor} size={16} style={{marginRight: 5}} />
                             </Text>
                             <I18nText name={'BACK'}  style={styles.backButton}  />
                         </View>
                     </TouchableOpacity>

                     <View style={styles.selectedUserPlaceholder} >
                         <I18nText style={styles.selectedUserText}
                                   name={moment(selectedPhoto.timestamp).format('MMM').toUpperCase()}
                                   additionalText={moment(selectedPhoto.timestamp).format(' D, HH:mm')}
                         />

                     </View>

                 </View>

                 <ScrollView style={styles.modalContent} ref="scrollView" >

                     <PhotoAnalysisPanel
                         showSkinry={false}
                         canPrev={canPrev}
                         canNext={canNext}
                         photoId={id}
                         onPrev={this.onPrev} onNext={this.onNext} />

                     {commentsEnabled == false ? null :
                         <CommentsPanel relatedId={id} />
                     }

                 </ScrollView>

                 <KeyboardSpacer />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
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

 let getAllPhotos = (state) => {
     let {photosMap} = state.photos;
     let photos = photosMap.toArray().sort((a, b) => {
         return (a.timestamp - b.timestamp)
     }).filter((a) => {return (a != undefined)})
     return photos;
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        photos: getAllPhotos(state),
        selectedPhoto: state.photos.photosMap.get(ownProps.id)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 PhotoViewPanel = connect(mapStateToProps, mapDispatchToProps)(PhotoViewPanel)

 export default PhotoViewPanel