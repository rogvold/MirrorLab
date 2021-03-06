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
    ActivityIndicator,
    Dimensions
} from 'react-native';

import LogoutButton from '../auth/buttons/LogoutButton'

import {H2, H3, H4} from 'nachos-ui';

import UploadDaemon from '../upload/UploadDaemon'

import UpdateProfilePanel from '../settings/panels/UpdateProfilePanel'

import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as colors from '../../constants/AppColors'

import LanguageSwitcherPanel from '../settings/panels/LanguageSwitcherPanel'

import I18nText from '../i18n/I18nText'

class SettingsApp extends React.Component {

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

                <View style={styles.headerPlaceholder} >
                    <I18nText name={'SETTINGS'} style={styles.headerText} />
                </View>

                <View style={{height: 280}} >
                    <UpdateProfilePanel />
                </View>

                <View style={{height: 140}} >
                    <LanguageSwitcherPanel />
                </View>

                <View style={{padding: 10}} >
                    <LogoutButton buttonName={'Logout'} loadingText={'Logging out...'} />
                </View>

                {/*<UploadDaemon />*/}

                <KeyboardSpacer />

            </View>
        )
    }

}

let {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 22,
        height: height,
        width: width,
        backgroundColor: 'white',

        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    button_placeholder: {
        height: 50,
        // alignSelf: 'center'
    },

    headerPlaceholder: {
        height: 40,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomWidth: 1,
        borderBottomColor: colors.cellBorder

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

//SplashApp = connect(mapStateToProps, mapDispatchToProps)(SplashApp)

export default SettingsApp