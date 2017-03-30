/**
 * Created by sabir on 09.03.17.
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
    TouchableOpacity,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator
} from 'react-native';

import ReactNative from 'react-native';
const { StatusBarManager } = NativeModules;

import CacheableFitImage from '../../image/CacheableFitImage'

import moment from 'moment';

import * as colors from '../../../constants/AppColors'
import * as constants from '../../../constants/AccountConstants'

class ChatUsersList extends React.Component {

    static defaultProps = {
        onUserPress: (uId) => {

        },
        getNotReadMessagesNumber: (uId) => {

        }
    }

    static propTypes = {}

    state = {
        activeUserId: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getDataSource = () => {
        let {users} = this.props;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {return (r1.id !== r2.id)}});
        return ds.cloneWithRows(users);
    }

    onUserPress = (userId) => {
        this.props.onUserPress(userId);
    }

    getPhotoRow = (user) => {
        let {getNotReadMessagesNumber} = this.props;
        let avatar = (user.avatar == undefined) ? constants.EMPTY_AVATAR : user.avatar;
        let notReadNumber = getNotReadMessagesNumber(user.id)

        return (
            <View style={styles.user_item}>

                <TouchableOpacity style={styles.touchablePlaceholder}
                                  onPress={this.onUserPress.bind(this, user.id)} >

                    <View style={styles.image_placeholder} >

                        <CacheableFitImage
                            url={avatar}
                            originalWidth={50}
                            originalHeight={50}
                            style={{borderRadius: 25}}
                        />

                    </View>
                    <View style={styles.info_placeholder} >
                        <Text style={{fontSize: 16, color: colors.inactiveText}} >
                            {user.firstName + ' ' + user.lastName}
                        </Text>
                    </View>

                    {notReadNumber == user || notReadNumber == 0 ? null :
                        <View style={styles.notReadPlaceholder} >
                            <Text style={styles.notReadText} >
                                ({notReadNumber})
                            </Text>
                        </View>
                    }

                </TouchableOpacity>
            </View>
        )
    }

    render = () => {
        let {photos} = this.props;

        return (
            <ListView
                dataSource={this.getDataSource()}
                renderRow={(rowData) => {return this.getPhotoRow(rowData)}}
                style={styles.container} >
            </ListView>
        )
    }

}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'yellow'
    },

    user_item: {
        height: 60,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.cellBorder,
        // marginBottom: 10,
        flexDirection: 'row'
    },

    image_placeholder: {
        height: 50,
        width: 50,
        borderRadius: 4,
    },

    info_placeholder: {
        paddingLeft: 5,
        flex: 1
    },

    touchablePlaceholder: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection:'row',
        // justifyContent: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    notReadPlaceholder: {
        width: 30,
        paddingRight: 5,
        // backgroundColor: 'pink'
    },

    notReadText: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 16,
        color: colors.primaryColor
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

//ChatUsersList = connect(mapStateToProps, mapDispatchToProps)(ChatUsersList)

export default ChatUsersList