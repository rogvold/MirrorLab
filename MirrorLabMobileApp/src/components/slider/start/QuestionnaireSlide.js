/**
 * Created by sabir on 05.03.17.
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

 const { width, height } = Dimensions.get('window')

 import * as colors from '../../../constants/AppColors'

 import Icon from 'react-native-vector-icons/FontAwesome'

 import OptionsPanel from './OptionsPanel'

 class QuestionnaireSlide extends React.Component {

     static defaultProps = {
         topHeader: '',
         infoText: undefined,

         options: [],

         type: 'circle',

         hasBack: true,

         onAnswer: (answerNumber) => {
             if (__DEV__){
                 console.log('onAnswer: answerNumber = ', answerNumber);
             }
         },

         onBack: () => {
             if (__DEV__){
                 console.log('QuestionnaireSlide: onBack default occured');
             }
         }

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

     onBack = () => {
         if (__DEV__){
             console.log('QuestionnaireSlide: onBack occured');
         }
         this.props.onBack();
     }

     render = () => {
         let {topHeader, infoText, options, onAnswer, hasBack, type} = this.props;

         if (__DEV__){
             console.log('QuestionnaireSlide: topHeader, infoText, options = ', topHeader, infoText, options);
         }

         return (
             <View style={styles.container} >

                 {hasBack == false ? null :
                     <View style={styles.topControlsPlaceholder} >
                         <TouchableOpacity style={styles.backButtonPlaceholder} onPress={this.onBack} >
                             <Text style={styles.backButton} >
                                 <Icon name="chevron-left" color={colors.questionnaireHeaderColor} size={16} style={{marginRight: 5}} />
                                 Back
                             </Text>
                         </TouchableOpacity>
                     </View>
                 }


                 <View style={styles.contentPlaceholder}>

                     {topHeader == undefined ? null :
                         <View style={styles.topHeaderPlaceholder}>
                            <Text style={styles.topHeader}>
                                {topHeader}
                            </Text>
                         </View>
                     }

                     {infoText == undefined ? null :
                        <View style={styles.infoTextPlaceholder}>
                            <Text style={styles.infoText} >
                                {infoText}
                            </Text>
                        </View>
                     }

                     {(options == undefined || options.length == 0) ? null :
                        <View style={styles.optionsPlaceholder} >
                            <OptionsPanel options={options} onAnswer={onAnswer} type={type} />
                        </View>
                     }

                 </View>


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // width: width,
         // height: height
         // flex: 1,
         flex: 1,
         // backgroundColor: 'blue'
     },

     topControlsPlaceholder: {
         position: 'absolute',
         zIndex: 2,
         top: 0,
         left: 0,
         right: 0,
         height: 40,
         padding: 10,
         // backgroundColor: 'yellow',
         justifyContent: 'center',
         // alignItems: 'center'
     },

     backButtonPlaceholder: {

     },

     backButton: {
        color: colors.questionnaireHeaderColor,
         fontSize: 16
     },

     contentPlaceholder: {
         position: 'absolute',
         zIndex: 2,
         top: 40,
         padding: 10,
         left: 0,
         right: 0,
         backgroundColor: 'white',
     },

     topHeaderPlaceholder: {
         // padding: 10
     },

     topHeader: {
         textAlign: 'center',
         fontSize: 28,
         fontWeight: 'bold',
         color: colors.questionnaireHeaderColor
     },

     infoTextPlaceholder: {
         padding: 10
     },

     infoText: {
        color: colors.questionnaireInfoColor
     },

     optionsPlaceholder: {
        paddingTop: 30
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

 //QuestionnaireSlide = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireSlide)

 export default QuestionnaireSlide