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

 import QuestionnaireFactory from '../../../data/QuestionnaireFactory'

 import Swiper from 'react-native-swiper'

 import QuestionnaireSlide from './QuestionnaireSlide'

 class QuestionnaireSwiper extends React.Component {

     static defaultProps = {
         questions: QuestionnaireFactory.gettingStartedQuestions,

         onFinish: (results) => {
             if (__DEV__){
                 console.log('onFinish: default: results = ', results);
             }
         }

     }

     static propTypes = {}

     state = {
         resultsMap: {

         }
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     onAnswer = (questionNumber, answerNumber) => {
         if (__DEV__){
             console.log('onAnswer: questionNumber, answerNumber = ', questionNumber, answerNumber);
         }
         let {questions, onFinish} = this.props;

         let {resultsMap} = this.state;
         let key = questionNumber + '';
         resultsMap[key] = answerNumber;

         if (questionNumber == questions.length - 1){
             if (__DEV__){
                 console.log('before onFinish');
             }
             onFinish(this.getResultDataByResultsMap(resultsMap));
             return;
         }
         this.swiper.scrollBy(1, true);
         this.setState({
             resultsMap: resultsMap
         });
     }

     onBack = (k) => {
         if (__DEV__){
             console.log('onBack : k = ', k);
         }
         if (k > 0){
             let nextK = +k - 1;
             if (__DEV__){
                 console.log('nextK = ' + nextK);
                 console.log('this.swiper = ', this.swiper);
             }
             setTimeout(() => {
                 this.swiper.scrollBy(-1, true);
             }, 10)
         }
     }


     getResultDataByResultsMap = (resMap) => {
         let {questions} = this.props;
         let arr = [];
         for (let i in questions){
            let q = questions[i];
            arr.push({
                question: q.topText,
                answerNumber: +resMap[i + ''],
                answer: questions[i].options[+resMap[i + '']].text
            });
         }
         if (__DEV__){
             console.log('getResultDataByResultsMap: arr = ', arr);
         }
         return arr;
     }

     render = () => {
         let {questions} = this.props;
         if (__DEV__){
             console.log('QuesionnaireSwiper: questions = ', questions);
         }

         return (
             <Swiper removeClippedSubviews={false}
                     ref={(e) => {

                                        if (__DEV__){
                                            console.log('this is slider ref: ', e);
                                        }

                                        this.swiper = e;
                         }}
                     style={styles.swiper}
                     loop={false}
                     scrollEnabled={false}
                     showsPagination={false}
                     paginationStyle={
                         {
                             bottom: 100
                         }
                     }
             >
                 {questions.map( (p, k) => {
                     let key = 'slide_' + k + '_';
                     let onAnswer = this.onAnswer.bind(this, k);
                     let onBack = this.onBack.bind(this, k);
                     let hasBack = (k > 0);

                     return (
                         <View style={styles.slide} key={key}>
                             <QuestionnaireSlide topHeader={p.topText} key={key}
                                                 onBack={onBack}
                                                 hasBack={hasBack}
                                                 options={p.options}
                                                 type={p.type}
                                                 onAnswer={onAnswer} />
                         </View>
                     )

                 } )}
             </Swiper>
         )
     }

 }

 var styles = StyleSheet.create({


     swiper: {
         // width: width,
         // height: height,
         // flex: 1,
         // backgroundColor: 'pink'
     },

     slide: {
         // width: width,
         // height: height,
         flex: 1,
         // backgroundColor: 'red'
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

 //QuestionnaireSwiper = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireSwiper)

 export default QuestionnaireSwiper