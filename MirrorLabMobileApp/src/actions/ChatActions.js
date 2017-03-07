/**
 * Created by sabir on 07.03.17.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';
import PhotosAPI from '../api/PhotosAPI.js';
import ChatAPI from '../api/ChatAPI.js';

import * as usersActions from './UsersActions'

//LOAD MESSAGES
let loadMessages_ = () => {
    return {
        type: types.LOAD_MESSAGES
    }
}
let loadMessagesFail = (error) => {
    return {
        type: types.LOAD_MESSAGES_FAIL,
        error: error
    }
}
let loadMessagesSuccess = (messages) => {
    return {
        type: types.LOAD_MESSAGES_SUCCESS,
        messages: messages
    }
}


//thunk
export function loadUserMessages(userId){
    return (dispatch, getState) => {
        let {messagesMap} = getState().chat;
        let messagesArr = messagesMap.toArray();
        let max = 0;
        for (let i in messagesArr){
            if (messagesArr[i].updatedTimestamp > max && (messagesArr[i].fromId == userId || messagesArr[i].toId == userId)){
                max = messagesArr[i].updatedTimestamp;
            }
        }
        dispatch(loadMessages_());
        return ChatAPI.loadUserMessages({userId: userId, lastUpdatedAt: max}).then(
            (messages) =>
                        {
                            return loadUsersFromMessages(getState(), dispatch, messages)
                                    .then(() => {return dispatch(loadMessagesSuccess(messages))})
                        },
            error => dispatch(loadMessagesFail(error))
        )
    }
}


//CREATE
let createMessage_ = () => {
    return {
        type: types.CREATE_MESSAGE
    }
}
let createMessageFail = (error) => {
    return {
        type: types.CREATE_MESSAGE_FAIL,
        error: error
    }
}
let createMessageSuccess = (message) => {
    return {
        type: types.CREATE_MESSAGE_SUCCESS,
        message: message
    }
}
//thunk
export function createMessage(data){
    return (dispatch, getState) => {
        let {currentUserId} = getState().users;
        data.fromId = currentUserId;
        dispatch(createMessage_())
        return ChatAPI.createMessage(data).then(
            message => dispatch(createMessageSuccess(message)),
            error => dispatch(createMessageFail(error))
        )
    }
}



//additionals

let loadUsersFromMessages = (state, dispatch, messages) => {
    if (__DEV__){
        console.log('loadUsersFromMessages: messages = ', messages);
    }

    let notLoadedMap = {};
    let {usersMap} = state.users;
    for (let i in messages){
        let m = messages[i];
        if (usersMap.get(m.fromId) == undefined){
            notLoadedMap[m.fromId] = 1;
        }
        if (usersMap.get(m.toId) == undefined){
            notLoadedMap[m.toId] = 1;
        }
    }

    let ids = [];
    for (let key in notLoadedMap){
        ids.push(key);
    }

    if (ids.length == 0){
        return Promise.resolve();
    }

    return dispatch(usersActions.loadUsersByIds(ids))
}