/**
 * Created by sabir on 26.03.17.
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
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';


import ChatFriendsPanel from '../chat/panels/ChatFriendsPanel'

import * as colors from '../../constants/AppColors'

import Icon from 'react-native-vector-icons/FontAwesome'

import * as actions from '../../actions/UsersActions'

import DoctorsPanel from '../doctors/panels/DoctorsPanel'

import I18nText from '../i18n/I18nText'

class DoctorsApp extends React.Component {

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
        let {findDoctorMode, closeFindDoctor} = this.props;

        return (
            <View style={styles.container} >

                <View style={styles.headerPlaceholder} >
                    <View>
                        <I18nText name={'MY_DOCTORS'} style={styles.headerTextPlaceholder} />
                    </View>
                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 0, bottom: 0, width: 50,
                                  alignItems: 'flex-end', justifyContent: 'center'}}
                                  onPress={() => {this.props.openFindDoctor()}}
                    >
                        <Icon name="plus" size={24} color={colors.fbColor} />
                    </TouchableOpacity>

                </View>

                <View style={styles.contentPlaceholder} >
                    <ChatFriendsPanel />
                </View>

                <Modal
                    animationType={'slide'}
                    visible={(findDoctorMode == true)}
                    onRequestClose={() => {closeFindDoctor()}}
                >

                    <View style={{flex: 1}} >
                        <DoctorsPanel />
                    </View>

                </Modal>

            </View>
        )
    }

}

let {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 22,
        // paddingTop: 42,
        height: height,


        backgroundColor: 'white',


        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    headerPlaceholder: {
        height: 40,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomWidth: 1,
        borderBottomColor: colors.cellBorder

    },

    headerTextPlaceholder: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.fbColor
    },

    contentPlaceholder: {
        height: height - 40 - 22,
        width: width
    }


});


const mapStateToProps = (state) => {
   return {
       currentUserId: state.users.currentUserId,
       loading: state.users.loading,
       findDoctorMode: state.users.findDoctorMode
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       openFindDoctor: () => {
           return dispatch(actions.selectFindDoctorMode())
       },
       closeFindDoctor: () => {
           return dispatch(actions.unselectFindDoctorMode())
       }
   }
}

DoctorsApp = connect(mapStateToProps, mapDispatchToProps)(DoctorsApp)

export default DoctorsApp