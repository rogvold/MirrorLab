/**
 * Created by sabir on 13.02.17.
 */

import ParseAPI from '../../../api/ParseAPI'

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

import ReactNative from 'react-native';

import {Input, Button, Spinner} from 'nachos-ui';

import I18nText from '../../i18n/I18nText'

import PrimaryButton from '../../buttons/PrimaryButton'

import I18nHelper from '../../../helpers/I18nHelper'

class SignupForm extends React.Component {

    static defaultProps = {
        onSubmit (data){
            console.log('default onSubmit occured: data = ', data);
        },
        loading: false
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        loading: PropTypes.bool
    }

    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    getData = () => {
        return {
            email: this.state.email,
            password: this.state.password
        }
    }

    onSubmit = () => {
        let {password, confirmPassword} = this.state;
        if (password == undefined || password.trim() == '' || password != confirmPassword){
            return;
        }
        this.props.onSubmit(this.getData());
    }

    canSubmit () {
        let data = this.getData();
        if (ParseAPI.isEmail(data.email) == false || data.password == undefined || data.password.trim() == ''){
            return false;
        }
        if (this.state.confirmPassword != data.password){
            return false;
        }

        return true;
    }

    render = () => {
        let {loading, lang} = this.props;
        let canSubmit = this.canSubmit() && (loading == false);
        let {confirmPassword, email, password} = this.state;

        return (
            <View style={styles.container} >

                <View style={styles.field} >

                    {(email == undefined || email.trim() == '') ? null :
                        <I18nText style={styles.label} name={'EMAIL'}/>
                    }

                    <TextInput value={email}
                               underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                               placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                               style={styles.input}
                               placeholder={I18nHelper.getString(lang, 'EMAIL')}
                               onChangeText={(v) => {this.setState({email: v.toLowerCase().trim()})}} />
                </View>

                <View style={styles.field} >

                    {(password == undefined || password.trim() == '') ? null :
                        <I18nText style={styles.label} name={'PASSWORD'}/>
                    }

                    <TextInput value={password}
                               underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                               secureTextEntry={true}
                               style={styles.input}
                               placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                               placeholder={I18nHelper.getString(lang, 'PASSWORD')}
                               type={'password'}
                               onChangeText={(v) => {this.setState({password: v.toLowerCase().trim()})}} />
                </View>

                <View style={styles.field} >

                    {(confirmPassword == undefined || confirmPassword.trim() == '') ? null :
                        <I18nText style={styles.label} name={'CONFIRM_PASSWORD'} />
                    }

                    <TextInput value={confirmPassword}
                               secureTextEntry={true}
                               underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                               style={styles.input}
                               placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                               placeholder={I18nHelper.getString(lang, 'CONFIRM_PASSWORD')}
                               type={'password'}
                               onChangeText={(v) => {this.setState({confirmPassword: v.toLowerCase().trim()})}} />
                </View>

                <View style={styles.button_placeholder}>
                    <PrimaryButton onPress={this.onSubmit} >
                        <I18nText name={'REGISTRATION'} style={styles.buttonText} isUpper={true} />
                    </PrimaryButton>
                </View>

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginVertical: 10
    },

    form_placeholder: {
        backgroundColor: 'transparent'
    },

    field: {
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)'
    },

    label: {
        backgroundColor: 'transparent',
        color: 'white',
        opacity: 0.7
    },

    input: {
        color: 'white',
        height: 40,
        fontSize: 18
    },

    button_placeholder: {
        marginVertical: 10
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    }

});


const mapStateToProps = (state) => {
   return {
       lang: state.settings.lang
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default SignupForm

