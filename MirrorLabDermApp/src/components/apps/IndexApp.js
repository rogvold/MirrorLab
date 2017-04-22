/**
 * Created by sabir on 14.02.17.
 */


import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Animatable from 'react-native-animatable';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Modal,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Navigator,
    TouchableHighlight,
    NativeModules,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator
} from 'react-native';

import LogoutButton from '../auth/buttons/LogoutButton'

import {H2, H3, H4} from 'nachos-ui';

import NewPhotoButton from '../photos/buttons/NewPhotoButton'

import CreateNewPhotoPanel from '../photos/panels/CreateNewPhotoPanel'

import UploadDaemon from '../upload/UploadDaemon'

import PhotosSlider from '../photos/slider/PhotosSlider'

import LastPhotosList from '../photos/list/LastPhotosList'

import CalendarPanel from '../calendar/CalendarPanel'

import PhotosHistoryTabbedPanel from '../photos/history/panels/PhotosHistoryTabbedPanel'

import * as colors from '../../constants/AppColors'

import I18nText from '../i18n/I18nText'

class IndexApp extends React.Component {

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
            console.log('IndexApp: render');
        }

        return (
            <View style={styles.container} >

                <View style={styles.headerPlaceholder} >
                    <I18nText name={'PHOTOS'} style={styles.headerText} />
                </View>

                {true == true ? null :
                    <View style={styles.slider_placeholder} >
                        <PhotosSlider />
                    </View>
                }

                {true == true ? null :
                    <View>
                        <LastPhotosList />
                    </View>
                }


                {true == true ? null :
                    <View style={styles.create_photo_panel_placeholder} >
                        <CreateNewPhotoPanel />
                    </View>
                }

                <PhotosHistoryTabbedPanel />


            </View>
        )
    }

}

// const { StatusBarManager } = NativeModules;
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;

let {width, height} = Dimensions.get('window');

let styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column'
    },

    slider_placeholder: {
        backgroundColor: 'whitesmoke',
        flex: 1,
    },

    create_photo_panel_placeholder: {
        // flex: 2,
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        left: 0,
        right: 0,
        height: 340
    },

    headerPlaceholder: {
        height: 40,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',

        // borderBottomWidth: 1,
        // borderBottomColor: colors.cellBorder

    },

    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.fbColor
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

//IndexApp = connect(mapStateToProps, mapDispatchToProps)(IndexApp)

export default IndexApp