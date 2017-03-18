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

 import WeekRow from './WeekRow'

 const {width, height} = Dimensions.get('window')

 class MonthPanel extends React.Component {

     static defaultProps = {

         monthTimestamp: undefined,
         selectedTimestamp: undefined,

         contentFunction: (ttimestamp, selectedTimestamp) => {
             return (
                 <View>

                 </View>
             );
         },

         totalWeekContentFunction: (t) => {
             return (
                 <View>

                 </View>
             );
         },

         selectedContentFunction: (selectedTimestamp) => {
             return (
                 <View>
                     X
                 </View>
             );
         },

         onDayClick: (t) => {

         },

         hasTotalColumn: false

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

     getWeeksTimestamps = () => {
         let start = +moment(this.props.monthTimestamp).startOf('month').startOf('isoweek').startOf('day').format('x');
         let end = +moment(this.props.monthTimestamp).endOf('month').endOf('isoweek').endOf('day').format('x');
         let t = start;
         let dt = 7 * 24 * 3600 * 1000;
         let arr = [];
         while(t < end){
             arr.push(t);
             t = t + dt;
         }
        return arr;
     }

     render = () => {
         let list = this.getWeeksTimestamps();
         let {contentFunction, totalWeekContentFunction, onDayClick,
             selectedContentFunction, monthTimestamp, selectedTimestamp, hasTotalColumn } = this.props;

         // if (__DEV__){
         //     console.log('MonthPanel: render: list = ', list);
         // }

         return (
             <View style={styles.container} >

                 {list.map((t, k) => {
                     let key = t + '_' + k;

                     let isExpanded = (+moment(selectedTimestamp).startOf('week').startOf('day').format('x') ==
                         +moment(t).startOf('week').startOf('day').format('x')) && (selectedTimestamp != undefined);

                     let st = styles.week;
                     if (isExpanded == true){
                         st = styles.expandedWeek;
                     }

                     return (
                         <View style={st} key={key}  >
                             <WeekRow
                                 contentFunction={contentFunction}
                                 totalWeekContentFunction={totalWeekContentFunction}
                                 selectedContentFunction={selectedContentFunction}
                                 monthTimestamp={monthTimestamp}
                                 weekTimestamp={t}
                                 selectedTimestamp={selectedTimestamp}
                                 onDayClick={onDayClick}
                                 hasTotalColumn={hasTotalColumn}
                             />
                         </View>
                     );

                 })}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         // backgroundColor: 'yellow',
         // height: 400,
         width: width
     },

     week: {
        // backgroundColor: 'green',
        height: 50
     },

     expandedWeek: {
        // height: 120
        height: 118,
        // backgroundColor: 'yellow'
        // height: 140
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

 //MonthPanel = connect(mapStateToProps, mapDispatchToProps)(MonthPanel)

 export default MonthPanel