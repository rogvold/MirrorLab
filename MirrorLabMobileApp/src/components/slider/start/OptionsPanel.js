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

 class OptionsPanel extends React.Component {

     static defaultProps = {
         onAnswer: (answerNumber) => {

         },

         type: 'circle', //round_circle, button, image

         options: [
             {
                 text: '-14',
                 color: 'orange'
             },
             {
                 text: '15-20',
                 color: 'green'
             },
             {
                 text: '15-20',
                 color: 'blue'
             },
             {
                text: '26+',
                color: 'purple'
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

     onAnswer = (k) => {
         console.log('option click: k = ', k);
         this.props.onAnswer(k);
     }

     render = () => {
         let {options, onAnswer, type} = this.props;

         return (
             <View style={styles.container} >

                 {options.map( (opt, k) => {
                     let key = 'option_' + k;
                     let onPress = this.onAnswer.bind(this, k);
                     let st = [];

                     let textStyle = {color: (opt.color == undefined ? colors.inactiveText : opt.color), textAlign: 'center', fontSize: width / 18.0};

                     if (type == 'circle'){
                         st.push(styles.circle)
                     }
                     if (type == 'image'){
                         st.push(styles.image_placeholder)
                         textStyle = Object.assign({}, textStyle, {fontSize: width / 24});
                     }
                     if (type == 'button'){
                         st.push(styles.button_placeholder);
                     }

                     let {text} = opt;
                     if (opt.color != undefined && (type == 'circle' || type == 'button')){
                         st.push({borderWidth: 3, borderColor: opt.color});
                     }

                     return (
                         <TouchableOpacity style={st} key={key} onPress={onPress} >

                             <View>
                                 {opt.image == undefined ? null :
                                     <Image source={opt.image} style={styles.img}  />
                                 }

                                 {text == undefined ? null :
                                     <Text style={textStyle} >
                                         {text}
                                     </Text>
                                 }
                             </View>

                         </TouchableOpacity>
                     )

                 })}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         flexDirection:'row',
         justifyContent: 'center'
     },

     circle: {
         width: width / 3,
         height: width / 3,
         margin: width / 20,
         borderRadius: width / 6,
         backgroundColor: 'white',
         alignItems: 'center',
         justifyContent: 'center',
         padding: width / 60
     },

     image_placeholder: {
         // width: width,
         margin: width / 20,
         // borderRadius: width / 6,
         // backgroundColor: 'pink'
     },

     button_placeholder: {
         width: width * 0.8,
         marginBottom: width / 20,
         borderRadius: 7,
         borderWidth: 3,
         padding: 15
     },

     img: {
         width: width / 3,
         height: width / 3,
         borderRadius: width / 6,
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

 //OptionsPanel = connect(mapStateToProps, mapDispatchToProps)(OptionsPanel)

 export default OptionsPanel