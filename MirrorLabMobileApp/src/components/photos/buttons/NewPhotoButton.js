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
     ActivityIndicator,
     Dimensions
 } from 'react-native';

 import {Button} from 'nachos-ui'

 import TakePhotoPanel from '../panels/TakePhotoPanel'

 import Icon from 'react-native-vector-icons/FontAwesome';

 import * as colors from '../../../constants/AppColors'

 class NewPhotoButton extends React.Component {

     static defaultProps = {
         style: {

         },
         buttonName: 'Take photo',
         onPhotoTaken: (uri) => {
             if (__DEV__){
                 console.log('default: onPhotoTaken: uri = ', uri);
             }
         }
     }

     static propTypes = {}

     state = {
         modalVisible: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onPhotoTaken = (photoUri) => {
         this.props.onPhotoTaken(photoUri);
         this.setState({
             modalVisible: false
         });
     }

     render = () => {
         let {style, buttonName} = this.props;
         let {modalVisible} = this.state;

         return (
             <View style={styles.container} >

                 <View style={styles.button_placeholder} >
                     <Button
                         iconName={'ios-camera-outline'}
                         onPress={() => {this.setState({modalVisible: true})}} >
                         {buttonName}
                     </Button>
                 </View>

                 <Modal
                     animationType={"slide"}
                     transparent={false}
                     visible={modalVisible}
                 >
                     <View style={styles.modal_style} >

                         <TouchableHighlight style={styles.close_style} onPress={() => {this.setState({modalVisible: false})}}>
                             <Icon name="close" size={35} color={colors.lightText} />
                         </TouchableHighlight>

                         <TakePhotoPanel onSubmit={this.onPhotoTaken} />

                     </View>

                 </Modal>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // alignSelf: 'center',
         alignSelf: 'center',
         // backgroundColor: 'pink',
         // alignItems: 'center',
         alignItems: 'flex-end',
         // justifyContent: 'center',
         justifyContent: 'flex-end',
         flexDirection: 'column',
         width: Dimensions.get('window').width
     },

     modal_style: {
         // paddingTop: 22
     },

     button_placeholder: {
        height: 50,
         alignSelf: 'center',
         // marginBottom: 120
         marginBottom: 80
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
         // backgroundColor: 'rgba(255, 255, 255, 0.2)',
         // borderWidth: 1,
         // borderColor: colors.darkText,
         alignItems: 'center',
         justifyContent: 'center'
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

 //NewPhotoButton = connect(mapStateToProps, mapDispatchToProps)(NewPhotoButton)

 export default NewPhotoButton