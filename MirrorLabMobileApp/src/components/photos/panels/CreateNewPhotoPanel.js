/**
 * Created by sabir on 15.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     Dimensions,
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
     ActivityIndicator
 } from 'react-native';

 import PhotoUploadPanel from './PhotoUploadPanel'
 import NewPhotoButton from '../buttons/NewPhotoButton'

 import {Spinner} from 'nachos-ui'

 class CreateNewPhotoPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
         localPhotoUri: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onStartedUploading = () => {
         this.setState({
             localPhotoUri: undefined
         });
     }

     render = () => {
         let {localPhotoUri} = this.state;
         let {loading} = this.props;

         return (
             <View style={styles.container} >

                 {localPhotoUri == undefined ? null :
                    <PhotoUploadPanel localPhotoUri={localPhotoUri} onStartedUploading={this.onStartedUploading} />
                 }

                 {(localPhotoUri != undefined || loading == true) ? null :
                     <NewPhotoButton onPhotoTaken={(u) => {this.setState({localPhotoUri: u})}} />
                 }

                 {loading == false ? null :
                     <View style={styles.uploading_placeholder} >
                         <Spinner />
                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // height: Dimensions.get('window').height,
         // backgroundColor: 'blue',
         // justifyContent: 'center',
         justifyContent: 'flex-start',
         alignItems: 'center',
         alignSelf: 'center'
     },

     uploading_placeholder: {
         justifyContent: 'center',
         alignItems: 'center',
         height: 100,
         marginTop: 10,
         alignSelf: 'center'
     }

 });

 let isUploading = (state) => {
    let {loadingSet} = state.upload;
    return !loadingSet.isEmpty();
 }

 const mapStateToProps = (state) => {
    return {
        loading: state.photos.loading || isUploading(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        // onLogout: (data) => {
        //     dispatch(actions.logOut())
        // }
    }
 }

 CreateNewPhotoPanel = connect(mapStateToProps, mapDispatchToProps)(CreateNewPhotoPanel)

 export default CreateNewPhotoPanel