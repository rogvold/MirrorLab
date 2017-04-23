/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

class CommentsList extends React.Component {

    static defaultProps = {
        comments: []
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

    render = () => {
        let {comments} = this.props;

        return (
            <div className={'comments_list'} >

                {comments.map((c, k) => {
                    let text = c.text == undefined ? '' : c.text;
                    text = text.replace(/\n/g, '<br/>')
                    return (
                        <div className={'comment_item'} key={c.id} >

                            <div className={'date_placeholder'} >
                                <div className={'date'} >
                                    {moment(c.timestamp).format('D MMM YYYY HH:mm')}
                                </div>
                            </div>

                            <div className={'text_placeholder'} >
                                <div className={'text'} >
                                    <div dangerouslySetInnerHTML={{__html: text}} ></div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

}


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

//CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsList)

export default CommentsList