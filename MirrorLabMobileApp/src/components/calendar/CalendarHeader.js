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

 class CalendarHeader extends React.Component {

     static defaultProps = {

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

     getGetFaysArray = () => {
         let list = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
             if (this.props.hasTotalColumn == true){
             list.push('WEEK');
         }
         return list;
     }

     render = () => {
         let list = this.getGetFaysArray();

         return (
             <View style={styles.placeholder} >

                 <View style={styles.daysPlaceholder}>
                     {list.map(function(s, k){
                         let key = 's_' + k;
                         return (
                             <View style={styles.item} key={key} >
                                 <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                                     {s}
                                 </Text>
                             </View>
                         );
                     }, this)}
                 </View>

             </View>
         );
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // backgroundColor: 'pink',
         alignSelf: 'stretch',
         alignItems: 'center',
         justifyContent: 'center',


     },

     daysPlaceholder: {
         flexDirection:'row',
     },

     item: {
         flex: 1
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

 //CalendarHeader = connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)

 export default CalendarHeader