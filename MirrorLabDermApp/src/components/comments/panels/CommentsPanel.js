/**
 * Created by sabir on 25.03.17.
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

 import CommentsList from '../list/CommentsList'

 import * as actions from '../../../actions/CommentsActions'

 import * as colors from '../../../constants/AppColors'

 const { width, height } = Dimensions.get('window')

 import KeyboardSpacer from 'react-native-keyboard-spacer';

 class CommentsPanel extends React.Component {

     static defaultProps = {
         relatedId: undefined
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

     onSend = () => {
         let {createComment} = this.props;
         let {relatedId, currentUserId} = this.props;
         createComment({
             relatedId: relatedId,
             text: this.state.text,
             userId: currentUserId
         }).then(() => {
             this.setState({
                 text: ''
             });
         })
     }

     onTextChange(event) {
         const { contentSize, text } = event.nativeEvent;

         this.setState({
             text: text,
             height: contentSize.height > 100 ? 100 : Math.max(contentSize.height, 40)
         });
     }

     render = () => {
         let {comments} = this.props;
         let {loading, text} = this.state;


         return (
             <View style={styles.container} >

                 <View style={styles.commentsPlaceholder} >

                     <CommentsList comments={comments} />

                 </View>

                 <View style={styles.bottomPlaceholder} >
                     <View style={styles.inputPlaceholder} >
                         <TextInput
                             multiline={true}
                             placeholder={'Your comment...'}
                             value={this.state.text}
                             style={{
                                 height: this.state.height,
                                 borderWidth: 1,
                                 borderColor: colors.cellBorder,
                                 borderRadius: 4,
                                 padding: 5,
                                 minHeight: 40,
                                 fontSize: 16
                             }}
                             onChange={this.onTextChange.bind(this)}
                             onChangeText={(text) => this.setState({text})} />
                     </View>

                     {(text == undefined || text.trim() == '') ? null :
                         <View style={styles.buttonPlaceholder} >
                             <TouchableOpacity onPress={this.onSend}>
                                 <Text style={styles.buttonText} >
                                     Send
                                 </Text>
                             </TouchableOpacity>
                         </View>
                     }

                 </View>

                 <KeyboardSpacer />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         // backgroundColor: 'pink',
         padding: 5,
     },

     bottomPlaceholder: {
        flexDirection: 'row',
         padding: 5
     },

     commentsPlaceholder: {
         // height: 120,
         // backgroundColor: 'yellow'
     },

     inputPlaceholder: {
         // width: width - 10 - 80
         flex: 1
     },

     buttonPlaceholder: {
         width: 80,
         justifyContent: 'center',
         alignItems: 'center'
     },

     buttonText: {
        fontSize: 20,
         color: colors.darkText
     },

     textInput: {

     },

     commentButton: {

     }

 });

 let getComments = (state, relatedId) => {
     let {usersMap} = state.users;
     let res = state.comments.commentsMap.toArray().filter((p) => {
         return (p.relatedId == relatedId)}).sort((a, b) => {return (a.timestamp - b.timestamp)
     }).map((comment) => {
         return {
             comment: comment,
             user: usersMap.get(comment.userId)
         }
     })
     return res;
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        comments: getComments(state, ownProps.relatedId),
        currentUserId: state.users.currentUserId,
        loading: state.comments.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (data) => {
            return dispatch(actions.createComment(data))
        }
    }
 }

 CommentsPanel = connect(mapStateToProps, mapDispatchToProps)(CommentsPanel)

 export default CommentsPanel