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

 import MonthPanel from './MonthPanel'
 import CalendarHeader from './CalendarHeader'

 import MonthSwitcher from './MonthSwitcher'

 class CalendarPanel extends React.Component {

     static defaultProps = {

         selectedTimestamp: undefined,

         contentFunction: (timestamp, selectedTimestamp) => {
             if (timestamp == selectedTimestamp){
                 return (
                     <View>
                         selected
                     </View>
                 );
             }
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
             console.log('onDayClick: ', t);
         },

         className: 'my_calendar',

         hasTotalColumn: false

     }

     static propTypes = {}

     state = {
         monthTimestamp: this.props.selectedTimestamp
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
         this.setState({
             monthTimestamp: nextProps.selectedTimestamp
         });
     }


     onMonthChange = (t) => {
       this.setState({
           monthTimestamp: t
       });
     }

     render = () => {
         let {monthTimestamp} = this.state;

         return (
             <View style={styles.container} >

                 <MonthSwitcher monthTimestamp={monthTimestamp} onChange={this.onMonthChange} />

                 <CalendarHeader />

                 <MonthPanel
                     monthTimestamp={this.state.monthTimestamp}
                     selectedTimestamp={this.props.selectedTimestamp}
                     contentFunction={this.props.contentFunction}
                     totalWeekContentFunction={this.props.totalWeekContentFunction}
                     selectedContentFunction={this.props.selectedContentFunction}
                     onDayClick={this.props.onDayClick}
                     hasTotalColumn={this.props.hasTotalColumn}
                 />


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
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

 //CalendarPanel = connect(mapStateToProps, mapDispatchToProps)(CalendarPanel)

 export default CalendarPanel