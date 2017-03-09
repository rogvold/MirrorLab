/**
 * Created by sabir on 04.03.17.
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
    ActivityIndicator,
    Dimensions
} from 'react-native';

import LogoutButton from '../auth/buttons/LogoutButton'

import {H2, H3, H4} from 'nachos-ui';

import UploadDaemon from '../upload/UploadDaemon'

 import InfoSlider from '../slider/info/InfoSlider'
 import QuestionnaireSwiper from '../slider/start/QuestionnaireSwiper'

 import SkinryImage from '../skinry/image/SkinryImage'
 import SkinryUserImage from '../skinry/image/SkinryUserImage'

 // import { Animated } from 'react-native';
 // import Animation from 'lottie-react-native';

class DevApp extends React.Component {

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
            <View style={styles.container} >

                {/*<QuestionnaireSwiper />*/}


                {/*<SkinryImage />*/}

                <SkinryUserImage photoId={'QP2EzjwH2O'} />





            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 22,
        // paddingTop: 42,
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button_placeholder: {
        height: 50,
        alignSelf: 'center'
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

//SplashApp = connect(mapStateToProps, mapDispatchToProps)(SplashApp)

export default DevApp