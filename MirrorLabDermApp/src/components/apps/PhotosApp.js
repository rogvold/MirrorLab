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

import LogoutButton from '../auth/buttons/LogoutButton'

import {H2, H3, H4} from 'nachos-ui';

import PhotosPanel from '../photos/panels/PhotosPanel'

import UploadDaemon from '../upload/UploadDaemon'

import PhotosHistoryTabbedPanel from '../photos/history/panels/PhotosHistoryTabbedPanel'

class PhotosApp extends React.Component {

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
        if (__DEV__){
            console.log('PhotosApp: render');
        }

        return (
            <View style={styles.container} >

                <PhotosHistoryTabbedPanel />

                <UploadDaemon/>

            </View>
        )
    }

}

let screenHeight = Dimensions.get("window").height;

var styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 22,
        // alignSelf: 'stretch',
        backgroundColor: 'whitesmoke',
        height: screenHeight,
        // position: 'absolute',
        // top: 0,
        // bottom: 0
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

//PhotosApp = connect(mapStateToProps, mapDispatchToProps)(PhotosApp)

export default PhotosApp