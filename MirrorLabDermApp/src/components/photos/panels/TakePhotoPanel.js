/**
 * Created by sabir on 14.02.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

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
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     Dimensions,
     ActivityIndicator,
     TouchableOpacity
 } from 'react-native';

 import Icon from 'react-native-vector-icons/FontAwesome';

 import Camera from 'react-native-camera';

 import * as colors from '../../../constants/AppColors'

 import * as navigationActions from '../../../actions/NavigationActions'

 class TakePhotoPanel extends React.Component {

     static defaultProps = {
         onSubmit: (uri) => {
             if (__DEV__){
                 console.log('onSubmit: uri = ', uri);
             }
         }
     }

     static propTypes = {
     }

     state = {
         takenPhoto: undefined,
         cameraMode: 'front'
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     takePicture() {
         this.camera.capture()
             .then((data) => {
                if (__DEV__){
                    console.log('data = ', data);
                }
                this.setState({takenPhoto: data})
            }
             )
             .catch(err => console.error(err));
     }

     onSubmit = () => {
         let {takenPhoto} = this.state;
         let {path} = takenPhoto;
         this.props.onSubmit(path);
     }

     changeCameraMode = () => {
         let {cameraMode} = this.state;
         let newMode = (cameraMode == 'front') ? 'back' : 'front';
         this.setState({
             cameraMode: newMode
         });
     }

     renderPreview = () => {
         let {takenPhoto} = this.state;
         let {path} = takenPhoto;


         if (__DEV__){
             console.log('trying to show image with path = ', path);
         }

         // path = 'https://s-media-cache-ak0.pinimg.com/originals/e5/f0/ff/e5f0ff57566a61f8ffeb8e779612076a.jpg';

         return (
             <View style={styles.container} >

                 <Image style={styles.preview}
                        source={{uri: path}} />

                 <View style={styles.capture_placeholder}>

                     <TouchableOpacity  onPress={this.onSubmit} style={{marginLeft: 15, marginRight: 15}} >
                         <Icon name="check" size={50} color={'white'} />
                     </TouchableOpacity>

                     <TouchableOpacity  style={{marginLeft: 15, marginRight: 15}}  onPress={() => {this.setState({takenPhoto: undefined})}} >
                         <Icon name="close" size={50} color={'white'} />
                     </TouchableOpacity>
                 </View>


             </View>
         )
     }

     render = () => {
         let {takenPhoto, cameraMode} = this.state;
         let {closeCamera, cameraEnabled} = this.props;
         if (cameraEnabled == false){
             return null;
         }


         if (__DEV__){
             console.log('TakenPhotoPanel: takenPhoto = ', takenPhoto);
         }

         if (takenPhoto != undefined){
             return this.renderPreview();
         }

         return (
             <View style={styles.container} >

                 <TouchableOpacity style={styles.close_style} onPress={() => {closeCamera()}}>
                     <Icon name="close" size={35} color={colors.lightText} />
                 </TouchableOpacity>

                 <Camera
                     ref={(cam) => { this.camera = cam;}}
                     style={styles.preview}
                     type={cameraMode}
                     captureTarget={Camera.constants.CaptureTarget.temp}
                     aspect={Camera.constants.Aspect.fill}>

                 </Camera>

                 <View style={styles.overlay} >
                    <Image style={styles.oval_image} source={require('../../../assets/images/oval_transparent.png')} />
                 </View>

                 <View style={styles.capture_placeholder}>
                     <View style={styles.captureSidePlaceholder} >
                         <TouchableOpacity onPress={this.changeCameraMode} >
                             <Icon name={'exchange'} size={40} color={'white'} />
                         </TouchableOpacity>
                     </View>

                     <View style={styles.captureCenterPlaceholder} >
                         <Text style={{textAlign: 'center'}} onPress={this.takePicture.bind(this)}>
                             <Icon name="camera" size={40} color={'white'} />
                         </Text>
                     </View>

                     <View style={styles.captureSidePlaceholder} >

                     </View>
                 </View>


             </View>
         )
     }

 }

let screenHeight = Dimensions.get("window").height;

 var styles = StyleSheet.create({
     container: {
         height: screenHeight
     },

     close_style: {
         position: 'absolute',
         zIndex: 100,
         top: 30,
         right: 8,
         padding: 5,
         borderRadius: 25,
         height: 50,
         width: 50,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'transparent'
     },

     preview: {
         flex: 1,
         justifyContent: 'flex-end',
         alignItems: 'center',
         height: Dimensions.get('window').height,
         width: Dimensions.get('window').width
     },

     capture_placeholder: {
         position: 'absolute',
         bottom: 0,
         zIndex: 10001,
         left: 0,
         right: 0,
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection: 'row',
         padding: 10,
         // backgroundColor: colors.darkBackground
         backgroundColor: colors.primaryColor
     },

     captureSidePlaceholder: {
         width: 70,
         // backgroundColor: 'pink'
     },

     captureCenterPlaceholder: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
     },

     overlay: {
         backgroundColor: 'rgba(255, 255, 255, 0.2)',
         flex: 1,
         position: 'absolute',
         top: 0,
         bottom: 0,
         right: 0,
         left: 0
     },

     oval_image: {
         opacity: 0.5,
         width: Dimensions.get('window').width,
         height: Dimensions.get('window').height,
     }

 });


 const mapStateToProps = (state) => {
    return {
        cameraEnabled: state.navigation.camera
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        closeCamera: () => {
            return dispatch(navigationActions.closeCamera())
        }
    }
 }

 TakePhotoPanel = connect(mapStateToProps, mapDispatchToProps)(TakePhotoPanel)

 export default TakePhotoPanel