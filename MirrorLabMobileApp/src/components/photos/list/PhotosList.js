/**
 * Created by sabir on 14.02.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import moment from 'moment';

 import * as colors from '../../../constants/AppColors'

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     ListView,
     ScrollView,
     Image,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

import FitImage from 'react-native-fit-image';

 class PhotosList extends React.Component {

     static defaultProps = {
         photos: []
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

     getDataSource = () => {
         let {photos} = this.props;
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {return (r1.id !== r2.id)}});
         return ds.cloneWithRows(photos);
     }

     getPhotoRow = (photo) => {
        return (
            <View style={styles.photo_item}>

                <View style={styles.image_placeholder} >

                    <FitImage
                        source={{uri: photo.url}}
                        originalWidth={50}
                        originalHeight={50}
                        style={{borderRadius: 4}}
                    />

                </View>
                <View style={styles.info_placeholder} >
                    <Text>
                        {moment(photo.timestamp).format('LLL')}
                    </Text>
                </View>
            </View>
        )
     }

     render = () => {
         let {photos} = this.props;

         return (
             <ListView
                 dataSource={this.getDataSource()}
                 renderRow={(rowData) => {return this.getPhotoRow(rowData)}}
                 style={styles.container} >
             </ListView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     photo_item: {
         height: 60,
         padding: 5,
         borderBottomWidth: 1,
         borderBottomColor: colors.cellBorder,
         // marginBottom: 10,
         flexDirection: 'row'
     },

     image_placeholder: {
        height: 50,
        width: 50,
        borderRadius: 4,
     },

     info_placeholder: {
        paddingLeft: 5
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

 //PhotosList = connect(mapStateToProps, mapDispatchToProps)(PhotosList)

 export default PhotosList