/**
 * Created by sabir on 17.03.17.
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
     ActivityIndicator
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

 class LastPhotosList extends React.Component {

     static defaultProps = {
         imagesNumber: 5
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

     render = () => {
         let {images} = this.props;

         return (
             <ScrollView style={styles.imagesPlaceholder} horizontal={true} >
                 {images.map((image, k) => {
                     return (
                         <View style={styles.imageItem} key={k} >
                             <Image source={{uri: image.url}} style={styles.coolImage} />
                         </View>
                     )
                 })}
             </ScrollView>
         )
     }

 }

 let {width, height} = Dimensions.get('window')

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     imagesPlaceholder: {
         // flexWrap: 'wrap',
         // alignItems: 'flex-start',
         flexDirection:'row',
         backgroundColor: 'pink',
         height: 1.5 * (width / 2.6)
     },

     imageItem: {
         // height: 200,
         width: width / 2.7,
         margin: 7,
         marginRight: 0,
         borderRadius: 7,
         backgroundColor: 'red'
     },

     coolImage: {
         flex: 1,
         borderRadius: 7
     },

 });

 let getImages = (state, number = 5) => {
     let {photosMap} = state.photos;
     let arr = photosMap.toArray().sort((a, b) => {return (b.timestamp - a.timestamp)})
     arr = arr.slice(0, number);
     return arr;
 }


 const mapStateToProps = (state, ownProps) => {
    return {
        images: getImages(state, ownProps.imagesNumber)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 LastPhotosList = connect(mapStateToProps, mapDispatchToProps)(LastPhotosList)

 export default LastPhotosList