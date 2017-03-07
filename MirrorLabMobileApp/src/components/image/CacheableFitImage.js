/**
 * Created by sabir on 03.03.17.
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
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

 import FitImage from 'react-native-fit-image';

 import CacheHelper from '../../helpers/CacheHelper'

 class CacheableFitImage extends React.Component {

     static defaultProps = {
         url: undefined,

         originalWidth: undefined,
         originalHeight: undefined,

         style: {

         }
     }

     static propTypes = {}

     state = {
         loading: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {url} = this.props;
        this.loadImage(url);
     }



     shouldComponentUpdate = (nextProps, nextState) => {
        if (__DEV__){
            console.log('CacheableFitImage: shouldComponentUpdate occured');
        }
        let {url} = this.props;
        let newUrl = nextProps.url;
        // return (url != newUrl)
         return true;
     }

     loadImage = (url) => {
        this.setState({
            loading: true
        });
         CacheHelper.getImageCachedUri(url).then((cachedUri) => {
             this.setState({
                 loading: false,
                 cachedUri: cachedUri
             });
         })
     }

     render = () => {
         let {loading, cachedUri} = this.state;
         let {style, originalWidth, originalHeight} = this.props;
         let st = Object.assign({}, style);
         if (originalHeight != undefined){
             st = Object.assign({}, st, {height: originalHeight})
         }
         if (originalWidth != undefined){
             st = Object.assign({}, st, {width: originalWidth})
         }

         if (loading == true){
             return (
                 <View style={st} >
                    <Text>loading...</Text>
                 </View>
             )
         }

         return (
             <FitImage
                 source={{uri: cachedUri}}
                 originalWidth={originalWidth}
                 originalHeight={originalHeight}
                 style={style}
             />
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

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

 //CacheableFitImage = connect(mapStateToProps, mapDispatchToProps)(CacheableFitImage)

 export default CacheableFitImage