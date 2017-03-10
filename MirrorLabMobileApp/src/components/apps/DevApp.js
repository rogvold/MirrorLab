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
    Dimensions,
    Picker
} from 'react-native';

import LogoutButton from '../auth/buttons/LogoutButton'

import {H2, H3, H4} from 'nachos-ui';

import UploadDaemon from '../upload/UploadDaemon'

 import InfoSlider from '../slider/info/InfoSlider'
 import QuestionnaireSwiper from '../slider/start/QuestionnaireSwiper'

 import SkinryImage from '../skinry/image/SkinryImage'
 import SkinryUserImage from '../skinry/image/SkinryUserImage'

 const { width, height } = Dimensions.get('window')

 import FoldView from 'react-native-foldview';

 import PhotosHistoryTabbedPanel from '../photos/history/panels/PhotosHistoryTabbedPanel'

 const Item = Picker.Item;

class DevApp extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        expanded: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    flip() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }




    render = () => {

        return (
            <View style={styles.container} >

                {/*<QuestionnaireSwiper />*/}

                {/*<SkinryImage />*/}

                {/*<SkinryUserImage photoId={'QP2EzjwH2O'} />*/}


                {/*<FoldView*/}
                    {/*expanded={this.state.expanded}*/}
                    {/*renderBackface={this.renderBackface}*/}
                    {/*renderFrontface={this.renderFrontface}*/}
                {/*>*/}
                    {/*<View>*/}
                        {/*<Text>*/}
                            {/*base*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                {/*</FoldView>*/}


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