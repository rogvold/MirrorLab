/**
 * Created by sabir on 13.02.17.
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
    ActivityIndicator
} from 'react-native';

import {Button} from 'nachos-ui';

import AuthPanel from '../auth/panels/AuthPanel'

import SplashApp from './SplashApp'

class AuthApp extends React.Component {

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
        let {loading, initialized} = this.props;

        if (initialized == false){
            return <SplashApp/>
        }

        return (
            <View style={styles.container} >

                <AuthPanel />

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});


const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        initialized: state.users.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

AuthApp = connect(mapStateToProps, mapDispatchToProps)(AuthApp)

export default AuthApp