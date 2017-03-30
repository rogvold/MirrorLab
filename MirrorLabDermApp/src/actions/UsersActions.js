/**
 * Created by sabir on 29.11.16.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';
import Parse from 'parse/react-native'

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
let authInitFailed = (err) => {
     if (__DEV__){
         console.log('authInitFailed occured');
     }
    return {
        type: types.INITIALIZE_AUTH_FAIL,
        error: err
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

export function loadDoctors() {
    return (dispatch, getState) => {
        dispatch(loadUsers_());
        let {usersMap} = getState().users;
        return ParseAPI.getFreshObjects(Parse.User, usersMap, {equalTo: [['userRole', 'doctor']]}, ParseAPI.transformUser).then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
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

export function createLink(data){
    return (dispatch, getState) => {
        dispatch(updateLink_());
        let {currentUserId} = getState().users;
        data.creatorId = currentUserId;
        return ParseAPI.runCloudFunctionAsPromise('createUserLink', data).then(
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

// update user

let updateUser_ = () => {
    return {
        type: types.UPDATE_USER
    }
}

let updateUserFail = (err) => {
    return {
        type: types.UPDATE_USER_FAIL,
        error: err
    }
}

let updateUserSuccess = (user) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user: user
    }
}

//thunk
export function updateUser(data){
    return (dispatch, getState) => {
        let {currentUserId, usersMap} = getState().users;
        data.id = currentUserId;
        dispatch(updateUser_());
        return ParseAPI.updateObject(Parse.User, data, ParseAPI.transformUser).then(
            user => dispatch(updateUserSuccess(user)),
            err => dispatch(updateUserFail(err))
        )
    }
}

export function selectDoctorToView(id){
    return (dispatch, getState) => {
        dispatch({
            type: types.SELECT_DOCTOR_TO_VIEW,
            id: id
        });
    }
}

export function unselectDoctorToView(id){
    return (dispatch, getState) => {
        dispatch({
            type: types.UNSELECT_DOCTOR_TO_VIEW
        });
    }
}

export function selectFindDoctorMode(id){
    return (dispatch, getState) => {
        dispatch({
            type: types.SELECT_FIND_DOCTOR_MODE,
        });
    }
}

export function unselectFindDoctorMode(id){
    return (dispatch, getState) => {
        dispatch({
            type: types.UNSELECT_FIND_DOCTOR_MODE,
        });
    }
}