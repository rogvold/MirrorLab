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

 class PhotosHistoryTabbedPanel extends React.Component {

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

         return (
             <ScrollableTabView style={styles.container}
                                renderTabBar={() => <TabBar /> }
             >


                 <View style={styles.photosComparePlaceholder} tabLabel={'calendar'}   >
                     <PhotosCalendarPanel />
                 </View>

                 <View style={styles.photosComparePlaceholder} tabLabel={'clone'}  >
                     <PhotosComparePanel showSkinry={false} />
                 </View>

                 <View style={styles.photosPanelPlaceholder} tabLabel={'list-ul'} >
                     <PhotosPanel  />
                 </View>




             </ScrollableTabView>
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

 //PhotosHistoryTabbedPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosHistoryTabbedPanel)

 export default PhotosHistoryTabbedPanel