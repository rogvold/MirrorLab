/**
 * Created by sabir on 25.03.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import CommentsAPI from '../../api/CommentsAPI';

import {Map} from 'immutable'

let loadComments_ = () => {

    return {
        type: types.LOAD_COMMENTS
    }
}

let loadCommentsFail = (err) => {
    return {
        type: types.LOAD_COMMENTS_FAIL,
        error: err
    }
}

let loadCommentsSuccess = (comments) => {
    return {
        type: types.LOAD_COMMENTS_SUCCESS,
        comments: comments
    }
}
//thunk
export function loadPhotosComments() {

    return (dispatch, getState) => {
        let {commentsMap} = getState().comments;
        let {photosMap} = getState().photos;
        let photosIds = photosMap.toArray().map(p => p.id);
        dispatch(loadComments_())
        return ParseAPI.getFreshObjects('Comment', commentsMap, {containedIn: [['relatedId', photosIds]]}, CommentsAPI.transformComment).then(
            comments => dispatch(loadCommentsSuccess(comments))),
            err => dispatch(loadCommentsFail(err))
    }
}

export function loadRelatedComments(relatedId) {
    return (dispatch, getState) => {
        let {commentsMap} = getState().comments;
        let {photosMap} = getState().photos;
        dispatch(loadComments_())
        return ParseAPI.getFreshObjects('Comment', commentsMap, {equalTo: [['relatedId', relatedId]]}, CommentsAPI.transformComment).then(
            comments => dispatch(loadCommentsSuccess(comments))),
            err => dispatch(loadCommentsFail(err))
    }
}

//
let createComment_ = () => {
    return {
        type: types.CREATE_COMMENT
    }
}

let createCommentFail = (err) => {
    return {
        type: types.CREATE_COMMENT_FAIL,
        error: err
    }
}

let createCommentSuccess = (comment) => {
    return {
        type: types.CREATE_COMMENT_SUCCESS,
        comment: comment
    }
}

export function createComment(data){
    return (dispatch, getState) => {
        if (data == undefined || data.relatedId == undefined){
            return;
        }
        dispatch(createComment_());
        return ParseAPI.createObject('Comment', data, CommentsAPI.transformComment).then(
            comment => dispatch(createCommentSuccess(comment)),
            err => dispatch(createCommentFail(err))
        )
    }
}

export function loadMyComments() {
    return (dispatch, getState) => {
        let {currentUserId} = getState().users;
        dispatch(loadComments_());
        return ParseAPI.getFreshObjects('Comment', Map(), {equalTo: [['userId', currentUserId]]}, CommentsAPI.transformComment).then(
            comments => dispatch(loadCommentsSuccess(comments)),
            err => dispatch(loadCommentsFail(err))
        )
    }
}