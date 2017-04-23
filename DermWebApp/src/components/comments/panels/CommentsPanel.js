/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CommentsList from '../list/CommentsList'

import * as commentsActions from '../../../redux/actions/CommentsActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class CommentsPanel extends React.Component {

    static defaultProps = {
        relatedId: undefined
    }

    static propTypes = {}

    state = {
        comment: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadComments, relatedId} = this.props;
        loadComments(relatedId);
    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {loading, comments, createComment, relatedId, currentUserId} = this.props;
        let {comment} = this.state;

        return (
            <div className={'comments_panel'} >

                <div className={'list_placeholder'} >
                    <CommentsList comments={comments} />
                </div>

                <div className={'create_comment_placeholder'} >
                    <div className={'ui form'} >
                        <div className="ui action input">
                        <textarea type="text"
                                  value={comment}
                                  onChange={(evt) => {this.setState({comment: evt.target.value})}}
                                  placeholder="Ваш комментарий" ></textarea>
                            <button className="ui button"
                                    onClick={() => {
                                        createComment({
                                            text: comment,
                                            relatedId: relatedId,
                                            userId: currentUserId
                                        }).then(
                                            () => {
                                                this.setState({
                                                    comment: ''
                                                });
                                            }
                                        )
                                    }}
                                    disabled={(comment == undefined || comment.trim() == '')} >
                                <i className={'icon send'} ></i>
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getComments = (state, relatedId) => {
    let comments = state.comments.commentsMap.toArray().filter((c) => {
        return (c.relatedId == relatedId)
    }).sort((a, b) => {
        return (a.timestamp - b.timestamp)
    });
    return comments;
}

const mapStateToProps = (state, ownProps) => {
   return {
       comments: getComments(state, ownProps.relatedId),
       loading: state.comments.loading,
       currentUserId: state.users.currentUserId
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        loadComments: (relatedId) => {
            return dispatch(commentsActions.loadRelatedComments(relatedId))
        },
       createComment: (data) => {
            return dispatch(commentsActions.createComment(data))
       }
   }
}

CommentsPanel = connect(mapStateToProps, mapDispatchToProps)(CommentsPanel)

export default CommentsPanel