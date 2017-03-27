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

 const {width, height} = Dimensions.get('window');

 import * as colors from '../../constants/AppColors'

 import Icon from 'react-native-vector-icons/FontAwesome';

 import * as actions from '../../actions/NavigationActions'

 import * as Animatable from 'react-native-animatable';

 class DermaNavigationTabBarsPanel extends React.Component {

     static defaultProps = {}

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

     getSideTab = (displayName, iconName, isActive, onClick) => {
         let textSt = Object.assign({}, {
             color: isActive == true ? colors.fbColor : colors.inactiveText,
             fontWeight: isActive == true ? 'bold' : 'normal',
             textAlign: 'center',
             fontSize: 16
         });
         return (
             <TouchableOpacity style={styles.tabPlaceholder} onPress={onClick} >
                 <View style={{flex: 1}} >
                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                         <Icon name={iconName} color={(isActive == true) ? colors.fbColor : colors.inactiveText} size={24} />
                     </View>
                     <View style={{height: 20, alignItems: 'center', justifyContent: 'center'}} >
                         <Text style={textSt}>
                             {displayName}
                         </Text>
                     </View>
                 </View>
             </TouchableOpacity>
         )
     }

     render = () => {
         let {tab, switchTab} = this.props;

         return (
             <View style={styles.container} >

                <View style={styles.sideView} >
                    {this.getSideTab('Photos', 'photo', (tab == 'index'), () => {switchTab('index')})}
                </View>

                 <View style={styles.sideView} >
                     {this.getSideTab('Doctors', 'user-md', (tab == 'doctors'), () => {switchTab('doctors')})}
                 </View>

                 <Animatable.View
                     animation="pulse" easing="ease-out" iterationCount="infinite"
                     style={styles.centerView} >
                     <TouchableOpacity style={styles.centerButton} >
                         <Text style={styles.centerButtonText} >
                             +
                         </Text>
                     </TouchableOpacity>
                 </Animatable.View>

                 <View style={styles.sideView} >
                     {this.getSideTab('Settings', 'gear', (tab == 'settings'), () => {switchTab('settings')})}
                 </View>

                 <View style={styles.sideView} >
                     {this.getSideTab('Help', 'question-circle-o', (tab == 'dev'), () => {switchTab('dev')})}
                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         position: 'absolute',
         left: 0,
         right: 0,
         bottom: 0,
         height: 49,
         borderTopWidth: 1,
         borderTopColor: colors.cellBorder,
         flexDirection: 'row',
         backgroundColor: 'white'
     },

     centerView: {
         width: 60,
         // width: 0,
         // backgroundColor: 'pink',
         alignItems: 'center',
         justifyContent: 'center',
         position: 'relative'
     },


     centerButton: {
         width: 60,
         height: 60,
         borderRadius: 30,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: colors.primaryColor,
         position: 'absolute',
         bottom: 10,
         // left: -30
         left: 0,
         // right: 0
     },

     centerButtonText: {
         alignItems: 'center',
         color: 'white',
         fontSize: 24
     },

     sideView: {
        flex: 1,
         // backgroundColor: 'blue'
     },

     tabPlaceholder: {
        flex: 1,
     },

     tabTextPlaceholder: {

     },

     tabImagePlaceholder: {

     }

 });


const mapStateToProps = (state) => {
    return {
        tab: state.navigation.tab
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchTab: (tab) => {
            return dispatch(actions.switchTab(tab))
        }
    }
}

 DermaNavigationTabBarsPanel = connect(mapStateToProps, mapDispatchToProps)(DermaNavigationTabBarsPanel)

 export default DermaNavigationTabBarsPanel