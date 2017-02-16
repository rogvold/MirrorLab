/**
 * Created by sabir on 13.02.17.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
     TabBarIOS,
 } from 'react-native';

 import * as colors from '../../constants/AppColors'

 import * as actions from '../../actions/NavigationActions'

 import Icon from 'react-native-vector-icons/FontAwesome';

 import TabNavigator from 'react-native-tab-navigator';

 class IOSNavigationTabBarsPanel extends React.Component {

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

     onTabSelect = (tab) => {
         this.props.switchTab(tab);
     }

     render = () => {
         let {tab} = this.props;

         if (__DEV__){
             console.log('IOSNavigationTabBarsPanel: tab = ', tab);
         }

         return (

         <TabNavigator>
             <TabNavigator.Item
                 selected={tab === 'index'}
                 title="Home"
                 allowFontScaling={true}
                 titleStyle={{fontSize: 14, color: colors.inactiveText}}
                 selectedTitleStyle={{fontSize: 14, color: colors.darkText}}
                 renderIcon={() => <Icon name="home" color={colors.inactiveText} size={24} />}
                 renderSelectedIcon={() => <Icon name="home" color={colors.darkText} size={24} />}
                 onPress={this.onTabSelect.bind(this, 'index')} >
                 <View></View>
             </TabNavigator.Item>

             <TabNavigator.Item
                 selected={tab === 'photos'}
                 title="Photos"
                 allowFontScaling={true}
                 titleStyle={{fontSize: 14, color: colors.inactiveText}}
                 selectedTitleStyle={{fontSize: 14, color: colors.darkText}}
                 renderIcon={() => <Icon name="photo" color={colors.inactiveText} size={24} />}
                 renderSelectedIcon={() => <Icon name="photo" color={colors.darkText} size={24} />}
                 onPress={this.onTabSelect.bind(this, 'photos')} >
                 <View></View>
             </TabNavigator.Item>

             <TabNavigator.Item
                 selected={tab === 'settings'}
                 title="Settings"
                 allowFontScaling={true}
                 titleStyle={{fontSize: 14, color: colors.inactiveText}}
                 selectedTitleStyle={{fontSize: 14, color: colors.darkText}}
                 renderIcon={() => <Icon name="gears" color={colors.inactiveText} size={24} />}
                 renderSelectedIcon={() => <Icon name="gears" color={colors.darkText} size={24} />}
                 onPress={this.onTabSelect.bind(this, 'settings')} >
                 <View></View>
             </TabNavigator.Item>

         </TabNavigator>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

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

 IOSNavigationTabBarsPanel = connect(mapStateToProps, mapDispatchToProps)(IOSNavigationTabBarsPanel)

 export default IOSNavigationTabBarsPanel