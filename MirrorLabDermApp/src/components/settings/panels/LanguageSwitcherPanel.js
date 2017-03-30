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

 import * as actions from '../../../actions/SettingsActions'

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../../constants/AppColors'

 import I18nText from '../../i18n/I18nText'

 class LanguageSwitcherPanel extends React.Component {

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
         let {setLang, lang} = this.props;
         let langs = [
             {
                 label: 'English',
                 value: 'en'
             },
             {
                 label: 'Русский',
                 value: 'ru'
             }
         ]

         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                     <I18nText style={styles.headerText} name={'LANGUAGE'} />
                 </View>

                 <View style={styles.listPlaceholder} >

                     {langs.map((l, k) => {
                        let key = 'lang_' + l.value + '_' + k;
                        let isActive = (lang == l.value);
                        let st = [styles.checkText];
                        if (isActive == true){
                            st.push(styles.activeText);
                        }

                        return (
                            <TouchableOpacity onPress={() => {setLang(l.value)}} key={key} style={styles.langItem} >
                                <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                    <Icon name={(isActive == true) ? 'check-square' : 'square-o'} size={16} style={st} />
                                    <Text style={st} >
                                        {l.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )

                     })}

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1
     },

     listPlaceholder: {
         flexDirection: 'row'
     },

     checkText: {
         fontSize: 16,
         color: colors.inactiveText,
         marginRight: 4
     },

     activeText: {
         fontWeight: 'bold',
         color: colors.fbColor
     },

     langItem: {
         padding: 10
     },

     headerPlaceholder: {
        padding: 10
     },

     headerText: {
         fontWeight: 'bold',
         fontSize: 20,
         color: colors.primaryColor
     }

 });


 const mapStateToProps = (state) => {
    return {
        lang: state.settings.lang
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        setLang: (lang) => {
            return dispatch(actions.setLang(lang))
        }
    }
 }

 LanguageSwitcherPanel = connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcherPanel)

 export default LanguageSwitcherPanel