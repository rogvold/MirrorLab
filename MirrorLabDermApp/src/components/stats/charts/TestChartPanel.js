/**
 * Created by sabir on 10.03.17.
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

 const spendingsPerYear_ = [
             {year: 2016, value: 3.24, name: 'sabir'},
             {year: 2015, value: 3.24, name: 'anton'},
             {year: 2014, value: 10.35},
             {year: 2013, value: 10.84},
             {year: 2012, value: 9.92},
             {year: 2011, value: 65.80},
             {year: 2010, value: 19.47},
             {year: 2009, value: 30.24},
             {year: 2008, value: 10.35},
             {year: 2007, value: 10.84},
             {year: 2006, value: 19.92},
             {year: 2005, value: 80.80},
             {year: 2004, value: 19.47},
             {year: 2003, value: 34.24},
             {year: 2001, value: 65.35},
             {year: 2000, value: 45.84},
             {year: 1999, value: 60.92},
             {year: 1998, value: 21.80},
             {year: 1997, value: 19.47},
             {year: 1996, value: 3.24},
             {year: 1995, value: 10.35},
             {year: 1994, value: 20.84},
             {year: 1993, value: 60.92},
             {year: 1992, value: 80.80},
         ];

 const spendingsLastMonth = [
             {"number":  8, "name": 'Fun activities'},
             {"number": 7, "name": 'Dog'},
             {"number": 16, "name": 'Food'},
             {"number": 23, "name": 'Car'},
             {"number": 42, "name": 'Rent'},
             {"number":  4, "name": 'Misc'},
         ]

 const colors = [
     "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
     "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
     ]

import AreaSpline from './AreaSpline';

 class TestChartPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         this.state = {
             activeIndex: 0,
             spendingsPerYear: spendingsPerYear_,
         };
         this._onPieItemSelected = this._onPieItemSelected.bind(this);
         this._shuffle = this._shuffle.bind(this);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     _shuffle(a) {
         for (let i = a.length; i; i--) {
             let j = Math.floor(Math.random() * i);
             [a[i - 1], a[j]] = [a[j], a[i - 1]];
         }
         return a;
     }

     _onPieItemSelected(newIndex){
         this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(spendingsPerYear_)});
     }

     render = () => {
         const height = 200;
         const width = 500;


         return (
             <ScrollView style={styles.container} >

                 <AreaSpline
                     width={width}
                     height={height}
                     data={this.state.spendingsPerYear}
                     color={colors[this.state.activeIndex]} />

                 <TouchableOpacity onPress={() => {
                     let n = Math.floor(10 * Math.random());
                     this._onPieItemSelected(n);
                 }} >
                     <Text>
                         shuffle
                     </Text>
                 </TouchableOpacity>

             </ScrollView>
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

 //TestChartPanel = connect(mapStateToProps, mapDispatchToProps)(TestChartPanel)

 export default TestChartPanel