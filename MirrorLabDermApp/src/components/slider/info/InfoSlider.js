/**
 * Created by sabir on 04.03.17.
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

 import Swiper from 'react-native-swiper'
 const { width, height } = Dimensions.get('window')

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as colors from '../../../constants/AppColors'


 class InfoSlider extends React.Component {

     static defaultProps = {
         backgroundColor: '#F3F3F8',

         onFinish: () => {
             if (__DEV__){
                 console.log('InfoSlider: onFinish default');
             }
         },

         onClose: () => {
             if (__DEV__){
                 console.log('InfoSlider: onClose default');
             }
         },

         slides: [
             {
                 topText: 'Бонусы Спасибо теперь на главном экране!',
                 bottomText: 'Актуальный баланс бонусов всегда рядом',
                 bottomButtonText: 'ДАЛЕЕ',
                 image: ''
             },
             {
                 topText: 'Кау узнать минимальный платеж по кредитной карте?',
                 bottomText: 'Сумму и дату минимального платежа всегда можно увидеть в разделе "Информация о карте" ',
                 bottomButtonText: 'ДАЛЕЕ',
                 image: ''
             }

         ]
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

     onButtonPress = (k) => {
         let {slides} = this.props;
         if (k < slides.length -1){
             k = k + 1;
             this.swiper.scrollBy(1, true);
         }
         if (k == slides.length - 1){
             this.props.onFinish();
         }
     }

     render = () => {
         let {slides} = this.props;


         return (
             <View style={styles.container} >

                 <View style={styles.top_close_placeholder}>
                    <TouchableOpacity onPress={this.props.onClose} >
                        <Icon name="close" color={colors.cellBorder} size={24} />
                    </TouchableOpacity>
                 </View>

                 <View style={styles.swiper_placeholder} >
                     <Swiper
                         ref={(e) => {

                                        if (__DEV__){
                                            console.log('this is slider ref: ', e);
                                        }

                                        this.swiper = e;
                         }}
                         style={styles.swiper}
                         dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 7, marginRight: 7}} />}
                         activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 7, marginRight: 7}} />}
                         loop={false}
                     >
                         {slides.map( (p, k) => {
                             let key = 'slide_' + k + '_';
                             let onButtonPress = this.onButtonPress.bind(this, k);
                             return (
                                 <View key={key} style={styles.slide} >

                                     <View style={styles.slide_inner} >

                                         <View style={styles.top_placeholder} >
                                             <Text style={styles.top_text} >
                                                 {p.topText}
                                             </Text>
                                         </View>

                                         <View style={styles.bottom_placeholder} >

                                             <View style={styles.bottom_text_placeholder} >
                                                 <Text style={styles.bottom_text} >
                                                     {p.bottomText}
                                                 </Text>
                                             </View>

                                             <View style={styles.bottom_button_placeholder} >

                                                 <TouchableOpacity style={styles.bottom_button} onPress={onButtonPress} >
                                                     <Text style={styles.bottom_button_text} >
                                                         {p.bottomButtonText}
                                                     </Text>
                                                 </TouchableOpacity>

                                             </View>

                                         </View>

                                     </View>

                                 </View>
                             )

                         } )}
                     </Swiper>
                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         width: width,
         height: height,
         backgroundColor: '#425551'
     },

     swiper_placeholder: {
        width: width,
        height: height - 40 - 100,
         paddingBottom: 40,
        // backgroundColor: 'green'
     },

     swiper: {
        // backgroundColor: 'purple',
        // paddingBottom: 200,
         height: height - 40 - 100
     },

     slide: {
         // flex: 1,
         paddingLeft: 20,
         paddingRight: 20,
         // backgroundColor: 'blue',
         paddingBottom: 80,
         height: height - 40
     },

     slide_inner: {
         // backgroundColor: 'red',
         backgroundColor: '#4DCD78',
         flex: 1,
         borderRadius: 7
     },

     top_close_placeholder: {
         width: width,
         height: 40,
         paddingLeft: 20,
         paddingTop: 10
     },

     top_text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
     },

     top_placeholder: {
         position: 'absolute',
         // backgroundColor: '#FEFEFE',
         top: 0,
         left: 0,
         right: 0,
         zIndex: 2,
         borderRadius: 7,
         padding: 20,
         paddingLeft: 30,
         paddingRight: 30
     },

     bottom_placeholder: {
         position: 'absolute',
         backgroundColor: '#FEFEFE',
         bottom: 0,
         left: 0,
         right: 0,
         zIndex: 2,
         borderBottomLeftRadius: 7,
         borderBottomRightRadius: 7
     },

     bottom_text_placeholder: {
         padding: 10
     },

     bottom_text: {
        textAlign: 'center',
        color: '#B7B7BB'
     },

     bottom_button_placeholder: {
         height: 60,
         // backgroundColor: 'yellow',
         padding: 10,
         borderRadius: 7
     },

     bottom_button: {
        backgroundColor: '#28D070',
        borderRadius: 20,
        height: 40,
        alignSelf: 'stretch',
        padding: 12
     },

     bottom_button_text: {
         color: 'white',
         textAlign: 'center'
     },


     close_button: {

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

 //InfoSlider = connect(mapStateToProps, mapDispatchToProps)(InfoSlider)

 export default InfoSlider