/**
 * Created by sabir on 17.03.17.
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

 import moment from 'moment'

 import Icon from 'react-native-vector-icons/FontAwesome';

 import * as colors from '../../constants/AppColors'

 import I18nText from '../i18n/I18nText'

 class MonthSwitcher extends React.Component {

     static defaultProps = {
         monthTimestamp: undefined,

         onChange: (t) => {

         },

         futureEnabled: false
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
         let t = this.props.monthTimestamp;
         t = +moment(t).startOf('month').startOf('day').format('x') - 1000;
         t = +moment(t).startOf('month').startOf('day').format('x');
         this.props.onChange(t);
    }

    onNext = () => {
        if (this.props.futureEnabled == false && (this.isCurrentMonth() == true)){
            return;
        }
        let t = this.props.monthTimestamp;
        t = +moment(t).endOf('month').endOf('day').format('x') + 1000;
        t = +moment(t).startOf('month').startOf('day').format('x');
        this.props.onChange(t);
    }

    getRuMonth = () => {
        var m = moment(this.props.monthTimestamp).format('MMMM');
        return {
            'january': 'Январь',
            'february': 'Февраль',
            'march': 'Март',
            'april': 'Апрель',
            'may': 'Май',
            'june': 'Июнь',
            'july': 'Июль',
            'august': 'Август',
            'september': 'Сентябрь',
            'october': 'Октябрь',
            'november': 'Ноябрь',
            'december': 'Декабрь'
        }[m.toLowerCase()];
    }



    isCurrentMonth = () => {
        let currStart = +moment(new Date().getTime()).startOf('month').startOf('day').format('x');
        let start = +moment(this.props.monthTimestamp).startOf('month').startOf('dat').format('x');
        return (start == currStart);
    }

     render = () => {
         var mLocName = moment(this.props.monthTimestamp).format('MMMM').toUpperCase();

         return (
             <View style={styles.container} >

                 <View className={'back_placeholder'} >
                     <TouchableOpacity onPress={this.onBack} >
                         <Text>
                             <Icon name="chevron-left" size={20} color={colors.lightText} />
                         </Text>
                     </TouchableOpacity>
                 </View>

                 <View className={'month_name_placeholder'} style={styles.monthPlaceholder}  >
                     <View className={'month'} >
                         <I18nText name={mLocName} style={{textAlign: 'center', fontSize: 20}} />
                     </View>
                     <View className={'year'} style={{marginLeft: 5}} >
                         <Text style={{fontSize: 20}} >
                             {moment(this.props.monthTimestamp).format('YYYY')}
                         </Text>
                     </View>
                 </View>

                 <View className={'next_placeholder'} >
                     <TouchableOpacity onPress={this.onNext} >
                         <Text>
                             <Icon name="chevron-right" size={20} color={colors.lightText} />
                         </Text>
                     </TouchableOpacity>

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         flexDirection:'row',
         alignItems: 'center',
         justifyContent: 'center',
         height: 40,
         // backgroundColor: 'pink'
     },

     monthPlaceholder: {
         width: 160,
         flexDirection:'row',
         alignItems: 'center',
         justifyContent: 'center',
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

 //MonthSwitcher = connect(mapStateToProps, mapDispatchToProps)(MonthSwitcher)

 export default MonthSwitcher