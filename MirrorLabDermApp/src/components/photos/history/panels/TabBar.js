/**
 * Created by sabir on 26.03.17.
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

 import Icon from 'react-native-vector-icons/FontAwesome';

 import * as colors from '../../../../constants/AppColors'

 class TapBar extends React.Component {

     static defaultProps = {}

     static propTypes = {
         goToPage: React.PropTypes.func,
         activeTab: React.PropTypes.number,
         tabs: React.PropTypes.array,
     }

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     render = () => {

         return (
             <View style={[styles.tabs, this.props.style, ]}>
                 {this.props.tabs.map((tab, i) => {
                     return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                         <Icon
                             name={tab}
                             size={30}
                             color={this.props.activeTab === i ? colors.fbColor : 'rgb(204,204,204)'}
                         />
                     </TouchableOpacity>;
                 })}
             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     tab: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         paddingBottom: 10,
     },
     tabs: {
         height: 45,
         flexDirection: 'row',
         paddingTop: 5,
         borderWidth: 1,
         borderTopWidth: 0,
         borderLeftWidth: 0,
         borderRightWidth: 0,
         borderBottomColor: 'rgba(0,0,0,0.05)',
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

 //TapBar = connect(mapStateToProps, mapDispatchToProps)(TapBar)

 export default TapBar