/**
 * Created by sabir on 10.03.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
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

 import ScrollableTabView from 'react-native-scrollable-tab-view'

 import PhotosPanel from '../../panels/PhotosPanel'

 import PhotosComparePanel from './PhotosComparePanel'

 import PhotosCalendarPanel from '../../panels/PhotosCalendarPanel'

 import TabBar from './TabBar'

 import PhotoViewPanel from '../../view/PhotoViewPanel'

 import I18nText from '../../../i18n/I18nText'

 class PhotosHistoryTabbedPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
        selectedPhotoId: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     render = () => {
         let {selectedPhotoId} = this.state;
         let {noPhotos} = this.props;

         return (
             <View style={{flex: 1}} >

                 {noPhotos == true ?
                     <View style={styles.noPhotosPlaceholder} >
                        <I18nText name={'YOU_HAVE_NO_PHOTOS'} style={{textAlign: 'center'}} />
                     </View>
                     :
                     <ScrollableTabView style={styles.container}
                                        renderTabBar={() => <TabBar /> }
                     >

                         <View style={styles.photosComparePlaceholder} tabLabel={'calendar'}   >
                             <PhotosCalendarPanel onPhotoClick={(id) => {this.setState({selectedPhotoId: id})}} />
                         </View>

                         <View style={styles.photosComparePlaceholder} tabLabel={'clone'}  >
                             <PhotosComparePanel showSkinry={false} />
                         </View>

                         <View style={styles.photosPanelPlaceholder} tabLabel={'list-ul'} >
                             <PhotosPanel onPhotoClick={(id) => {this.setState({selectedPhotoId: id})}} />
                         </View>

                     </ScrollableTabView>
                 }

                 <Modal
                     animationType={'slide'}
                     transparent={this.state.transparent}
                     visible={(selectedPhotoId != undefined)}
                     onRequestClose={() => {this.setState({selectedPhotoId: undefined})}}
                 >

                     <PhotoViewPanel
                         onClose={() => {this.setState({selectedPhotoId: undefined})}}
                         onPhotoSelect={(id) => {this.setState({selectedPhotoId: id})}}
                         id={selectedPhotoId} />

                 </Modal>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     photosPanelPlaceholder: {
        flex: 1
     },

     photosComparePlaceholder: {

     },

     noPhotosPlaceholder: {
         alignItems: 'center',
         justifyContent: 'center',
         padding: 10
     }


 });


 const mapStateToProps = (state) => {
    return {
        noPhotos: state.photos.photosMap.isEmpty()
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 PhotosHistoryTabbedPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosHistoryTabbedPanel)

 export default PhotosHistoryTabbedPanel