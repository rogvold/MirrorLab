/**
 * Created by sabir on 09.03.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     LayoutAnimation,
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

 import SkinryUserImage from '../image/SkinryUserImage'

 const { width, height } = Dimensions.get('window')

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../../constants/AppColors'

 import Emoji from 'react-native-emoji'

 class PhotoAnalysisPanel extends React.Component {

     static defaultProps = {
         hasPrevNextControls: true,
         canNext: true,
         canPrev: true,

         showSkinry: false,

         onPrev: () => {

         },

         onNext: () => {

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

     componentWillUpdate() {
         LayoutAnimation.easeInEaseOut();
     }


     render = () => {
         let {photo, hasPrevNextControls, canNext, canPrev, showSkinry} = this.props;

         if (photo == undefined || photo.data == undefined || photo.data.imgInfo == undefined){
             return null;
         }
         let {spots} = photo.data;

         let w = 2.0 * width / 3;


         return (
             <View style={styles.container} >

                 <View style={styles.photoPlaceholder}  >

                     {hasPrevNextControls == false ? null :
                         <TouchableOpacity style={styles.leftSidebar}  onPress={this.props.onPrev}  >
                             <Icon name="chevron-left" color={colors.darkText} size={16}
                                   style={{marginRight: 0, opacity: (canPrev == false) ? 0.3 : 1}}
                             />
                         </TouchableOpacity>
                     }

                     <SkinryUserImage
                         showSkinry={showSkinry}
                         photoId={photo.id} photoWidth={w} />

                     {hasPrevNextControls == false ? null :
                         <TouchableOpacity style={styles.rightSidebar} onPress={this.props.onNext} >
                             <Icon name="chevron-right" color={colors.darkText} size={16}
                                   style={{marginRight: 0, opacity: (canNext == false) ? 0.3 : 1}}
                             />
                         </TouchableOpacity>
                     }

                 </View>

                 {showSkinry == false ? null :
                     <View style={styles.infoPlaceholder}>

                         <Text style={{textAlign: 'center'}} >
                             <Emoji name={':red_circle:'} />
                             Spots number = {spots.length}
                         </Text>

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

     photoPlaceholder: {
        alignItems: 'center',
         // backgroundColor: 'pink',
         padding: 5
     },

     infoPlaceholder: {
         padding: 5,
         // backgroundColor: 'wheat'
     },

     leftSidebar: {
         position: 'absolute',
         left: 0,
         top: 0,
         bottom: 0,
         // backgroundColor: 'yellow',
         width: width / 6.0,
         alignItems: 'center',
         justifyContent: 'center'
     },

     rightSidebar: {
         width: width / 6.0,
         position: 'absolute',
         right: 0,
         top: 0,
         bottom: 0,
         // backgroundColor: 'yellow',
         alignItems: 'center',
         justifyContent: 'center'
     }

 });


 const mapStateToProps = (state, ownProps) => {
    return {
        photo: state.photos.photosMap.get(ownProps.photoId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 PhotoAnalysisPanel = connect(mapStateToProps, mapDispatchToProps)(PhotoAnalysisPanel)

 export default PhotoAnalysisPanel