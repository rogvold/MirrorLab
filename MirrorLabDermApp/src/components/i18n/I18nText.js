/**
 * Created by sabir on 28.03.17.
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

 import Icon from 'react-native-vector-icons/FontAwesome'

 import I18nHelper from '../../helpers/I18nHelper'

 class I18nText extends React.Component {

     static defaultProps = {
         name: undefined,
         params: undefined,
         isUpper: false
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
         let {name, style, lang, params, isUpper} = this.props;
         let text = I18nHelper.getString(lang, name, params);
         if (isUpper == true){
             text = text.toUpperCase();
         }

         return (
             <Text style={style} >
                 {text}
             </Text>
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
        lang: state.settings.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 I18nText = connect(mapStateToProps, mapDispatchToProps)(I18nText)

 export default I18nText