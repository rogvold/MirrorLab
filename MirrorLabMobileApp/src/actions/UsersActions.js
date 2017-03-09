/**
 * Created by sabir on 29.11.16.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';

//LOGIN
let startLoggingIn = () => {
    return {
        type: types.LOGIN
    }
}
let onLoggedIn = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        user: user
    }
}
let onLoginFailed = (error) => {
    return {
        type: types.LOGIN_FAIL,
        error: error
    }
}
//thunk
export function logIn(data){
    return (dispatch, getState) => {
        dispatch(startLoggingIn())
        return ParseAPI.logInAsPromise(data.email, data.password).then(
                user => dispatch(onLoggedIn(user)),
                error => dispatch(onLoginFailed(error))
        )
    }
}

//SIGNUP
let startSigningUp = () => {
    return {
        type: types.SIGNUP
    }
}
let onSignedUp = (user) => {
    return {
        type: types.SIGNUP_SUCCESS,
        user: user
    }
}
let onSignUpFail = (error) => {
    return {
        type: types.SIGNUP_FAIL,
        error: error
    }
}
//thunk
export function signUp(data){
    return (dispatch, getState) => {
        dispatch(startSigningUp())
        return ParseAPI.signUpAsPromise(data).then(
                user => dispatch(onSignedUp(user)),
                error => dispatch(onSignUpFail(error))
        )
    }
}

//LOGOUT
let startLoggingOut = () => {
    console.log('startLoggingOut occured');
    return {
        type: types.LOGOUT
    }
}
let onLogoutFail = () => {
    return {
        type: types.LOGOUT_FAIL
    }
}
let onLoggedOut = () => {
    return {
        type: types.LOGOUT_SUCCESS
    }
}
//thunk
export function logOut(){
    return (dispatch, getState) => {
        var usersState = getState().users;
        console.log('usersState = ', usersState);
        if (usersState.currentUserId == undefined){
            return Promise.resolve()
        }
        dispatch(startLoggingOut());
        return ParseAPI.logOutAsPromise().then(
            () => dispatch(onLoggedOut()),
            () => dispatch(onLogoutFail())
        )
    }
}

//AUTH_INIT
let startAuthInit = () => {
    return {
        type: types.INITIALIZE_AUTH
    }
}
let authInitFailed = () => {
    return {
        type: types.INITIALIZE_AUTH_FAIL
    }
}
let authInitSuccess = (user) => {
    return {
        type: types.INITIALIZE_AUTH_SUCCESS,
        user: user
    }
}
//thunk
export function initializeAuthorization(){
    return (dispatch, getState) => {
        // if (getState().users.initialized == true){
        //     return Promise.resolve()
        // }

        dispatch(startAuthInit());
        return ParseAPI.fetchCurrentUserAsPromise().then(
            user => dispatch(authInitSuccess(user)),
            err => dispatch(authInitFailed())
        );
    }
}

//USERS
let loadUsers_ = () => {
    return {
        type: types.LOAD_USERS
    }
}

let loadUsersFail = (error) => {
    return {
        type: types.LOAD_USERS_FAIL,
        error: error
    }
}

let loadUsersSuccess = (users) => {
    return {
        type: types.LOAD_USERS_SUCCESS,
        users: users
    }
}

export function loadUsersByIds(ids){
    if (__DEV__){
        console.log('loadUsersByIds occured: ids = ', ids);
    }
    return (dispatch, getState) => {
        dispatch(loadUsers_());
        return ParseAPI.getUsersByIds(ids).then(
            users => dispatch(loadUsersSuccess(users)),
            error => dispatch(loadUsersFail(error))
        )
    }
}


//   ---   USERS LINKS   ---
let loadUserLinks_ = () => {
    return {
        type: types.LOAD_USER_LINKS
    }
}

let loadUserLinksFail = (error) => {
    return {
        type: types.LOAD_USER_LINKS_FAIL,
        error: error
    }
}

let loadUserLinksSuccess = (links, users) => {
    return {
        type: types.LOAD_USER_LINKS_SUCCESS,
        links: links,
        users: users
    }
}

//thunks
export function  loadUserUserLinks(userId){
    return (dispatch, getState) => {
        let {currentUserId} = getState().users;
        if (userId == undefined && currentUserId != undefined){
            userId = currentUserId
        }
        if (userId == undefined){
            return;
        }
        dispatch(loadUserLinks_());
        // return ParseAPI.runCloudFunctionAsPromise('loadUserLinks', {userId: userId}).then(
        return ParseAPI.runCloudFunctionAsPromise('loadLinks', {userId: userId}).then(
            d => {dispatch(loadUserLinksSuccess(d.links, d.users))},
            err => {dispatch(loadUserLinksFail(err))}
        )
    }
}

//update link

let updateLink_ = () => {
    return {
        type: types.UPDATE_USER_LINK
    }
}
let updateLinkFail = (err) => {
    return {
        type: types.UPDATE_USER_LINK_FAIL,
        error: err
    }
}
let updateLinkSuccess = (link) => {
    return {
        type: types.UPDATE_USER_LINK_SUCCESS,
        link: link
    }
}
export function updateLink(data){
    return (dispatch, getState) => {
        dispatch(updateLink_());
        return ParseAPI.runCloudFunctionAsPromise('updateUserLink', data).then(
            link => {dispatch(updateLinkSuccess(link))},
            err => {dispatch(updateLinkFail(err))}
        )
    }
}

let deleteLink_ = () => {
    return {
        type: types.DELETE_USER_LINK
    }
}
let deleteLinkFail = (err) => {
    return {
        type: types.DELETE_USER_LINK_FAIL,
        error: err
    }
}
let deleteLinkSuccess = (id) => {
    return {
        type: types.DELETE_USER_LINK_SUCCESS,
        id: id
    }
}

export function deleteUserLink(id){
    return (dispatch, getState) => {
        dispatch(deleteLink_());
        return ParseAPI.runCloudFunctionAsPromise('deleteUserLink', {id: id}).then(
            d => {dispatch(deleteLinkSuccess(id))},
            err => {dispatch(deleteLinkFail(err))}
        )
    }
}