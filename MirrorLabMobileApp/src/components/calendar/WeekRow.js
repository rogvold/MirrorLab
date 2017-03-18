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

 let {width, height} = Dimensions.get('window')

 class WeekRow extends React.Component {

     static defaultProps = {
         monthTimestamp: undefined,
         weekTimestamp: undefined,

         selectedTimestamp: undefined,

         contentFunction: (ttimestamp, selectedTimestamp) =>{
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

                 </View>
             );
         },

         onDayClick: (t) => {

         },

         isHeader: false,

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

     getDaysTimestampArray = () => {
         let start = +moment(this.props.weekTimestamp).startOf('isoWeek').startOf('day').format('x');
         let t = start;
         let dt = 24 * 3600 * 1000;
         let arr = [];
         for (let i = 0; i < 7; i++){
             arr.push(t);
             t = t + dt;
         }
         return arr;


     }

     getDayContent = (t) => {
        let cf = this.props.contentFunction;
        if (cf == undefined){
             return null;
        }
        return cf(t);
    }

    getTotalWeekContent = () => {
        let cf = this.props.totalWeekContentFunction;
        if (cf == undefined){
            return null;
        }
        let t = this.props.weekTimestamp;
        return cf(t);
    }

    getSelectedContent = () => {
        let {selectedTimestamp, weekTimestamp} = this.props;
        if (selectedTimestamp == undefined){
            return null;
        }
        let isSelected = (+moment(selectedTimestamp).startOf('week').startOf('day').format('x') ==
                          +moment(weekTimestamp).startOf('week').startOf('day').format('x'));
        if (isSelected == false){
            return null;
        }
        let cf = this.props.selectedContentFunction;
        if (cf == undefined){
            return null;
        }
        return cf(this.props.selectedTimestamp);
    }

    onDayClick = (t) => {
         if (__DEV__){
             console.log('WeekRow: onDayClick: t = ' + t);
         }
        this.props.onDayClick(t);
    }

     render = () => {
         let list = this.getDaysTimestampArray();
         let selectedContent = this.getSelectedContent();
         let totalWeekContent = this.getTotalWeekContent();

         let {selectedTimestamp, monthTimestamp, hasTotalColumn} = this.props;


         return (
             <View style={styles.container} >

                 <View style={styles.daysPlaceholder}  >

                     {list.map((t, k) => {
                         let key = monthTimestamp + '_' + k + '_' + t;
                         let content = this.getDayContent(t);
                         let onClick = this.onDayClick.bind(this, t);

                         let daySt = styles.day;
                         let innerDaySt = styles.innerDay;

                         let isSelected = (+moment(selectedTimestamp).startOf('day').format('x') ==
                             +moment(t).startOf('day').format('x')) && (selectedTimestamp != undefined);

                         if (+moment(monthTimestamp).startOf('month').startOf('day').format('x') !=
                             +moment(t).startOf('month').startOf('day').format('x')){
                             {/*dayClassName = dayClassName + ' not_this_month ';*/}
                             daySt = styles.notThisMonthDay;
                         }

                         let dayNumSt = styles.dayNumber;

                         {/*if (+moment(new Date().getTime()).startOf('day').format('x') ==*/}
                             {/*+moment(t).startOf('day').format('x')){*/}
                             {/*dayNumberClassName = 'dayNumber today';*/}
                         {/*}*/}

                         if (isSelected == true){
                             dayNumSt = styles.selectedDayNumber;
                             innerDaySt = styles.selectedInnerDay;
                         }else {
                             dayNumSt = styles.notSelectedDayNumber;
                         }

                         return (
                             <View style={daySt}
                                  key={key}  >
                                 <TouchableOpacity onPress={onClick} style={innerDaySt} >
                                     <View style={dayNumSt} >
                                         <Text style={styles.dayText} >
                                             {moment(t).format('D')}
                                         </Text>
                                     </View>
                                     {content}
                                 </TouchableOpacity>
                             </View>
                         );

                     })}

                     {hasTotalColumn == false ? null :
                         <View >
                             {totalWeekContent}
                         </View>
                     }

                 </View>

                 {selectedContent == undefined ? null :
                     <View style={styles.selectedContentPlaceholder}>
                         {selectedContent}
                     </View>
                 }

             </View>
         )
     }

 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         // backgroundColor: 'pink',
         alignSelf: 'stretch',
         alignItems: 'center',
         justifyContent: 'center'
     },

     daysPlaceholder: {
         // flexWrap: 'wrap',
         // alignItems: 'flex-start',
         flexDirection:'row',
     },

     day: {
        flex: 1
     },

     innerDay: {
         padding: 3,
         paddingBottom: 0,
     },

     selectedInnerDay: {
         padding: 3,
         paddingBottom: 0,
         fontWeight: 'bold',
         backgroundColor: '#FCF9FC',
         borderTopLeftRadius: 4,
         borderTopRightRadius: 4,
     },

     notThisMonthDay: {
        opacity: 0.3,
         flex: 1
     },

     dayText: {
         textAlign: 'center'
     },

     dayNumber: {

     },

     selectedDayNumber: {

     },

     notSelectedDayNumber: {

     },

     selectedContentPlaceholder: {
         height: 84,
         // backgroundColor: 'whitesmoke'
         backgroundColor: '#FCF9FC',
         // flex: 1,
         alignSelf: 'stretch',
         justifyContent: 'center',
         alignItems: 'center'
         // backgroundColor: 'yellow'
        // backgroundColor: 'red',
        //  height: 30,
        //  width: width
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

 //WeekRow = connect(mapStateToProps, mapDispatchToProps)(WeekRow)

 export default WeekRow