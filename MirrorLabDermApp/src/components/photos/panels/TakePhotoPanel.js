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
     ActivityIndicator
 } from 'react-native';

 import Icon from 'react-native-vector-icons/FontAwesome';

 import Camera from 'react-native-camera';

 import * as colors from '../../../constants/AppColors'

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
         takenPhoto: undefined
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
                     <Text style={styles.capture} onPress={this.onSubmit} >
                         <Icon name="check-circle-o" size={50} color={'white'} />
                     </Text>
                 </View>


             </View>
         )
     }

     render = () => {
         let {takenPhoto} = this.state;

         if (__DEV__){
             console.log('TakenPhotoPanel: takenPhoto = ', takenPhoto);
         }

         if (takenPhoto != undefined){
             return this.renderPreview();
         }

         return (
             <View style={styles.container} >

                 <Camera
                     ref={(cam) => { this.camera = cam;}}
                     style={styles.preview}
                     type="front"
                     captureTarget={Camera.constants.CaptureTarget.temp}
                     aspect={Camera.constants.Aspect.fill}>

                 </Camera>

                 <View style={styles.overlay} >
                    <Image style={styles.oval_image} source={require('../../../assets/images/oval_transparent.png')} />
                 </View>

                 <View style={styles.capture_placeholder}>
                     <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
                         <Icon name="camera" size={40} color={'white'} />
                     </Text>
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
         backgroundColor: colors.darkBackground
     },

     capture: {
         flex: 0,
         padding: 10,
         borderRadius: 10
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

 //TakePhotoPanel = connect(mapStateToProps, mapDispatchToProps)(TakePhotoPanel)

 export default TakePhotoPanel