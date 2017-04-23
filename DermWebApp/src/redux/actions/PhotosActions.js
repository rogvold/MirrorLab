/**
 * Created by sabir on 14.02.17.
 */
import * as types from '../ActionTypes.js'
import ParseAPI from '../../api/ParseAPI.js';
import PhotosAPI from '../../api/PhotosAPI.js';

import {Map} from 'immutable'

//LOAD PHOTOS
let loadPhotos_ = () => {
    return {
        type: types.LOAD_PHOTOS
    }
}
let loadPhotosFail = (error) => {
    return {
        type: types.LOAD_PHOTOS_FAIL,
        error: error
    }
}
let loadPhotosSuccess = (photos) => {
    return {
        type: types.LOAD_PHOTOS_SUCCESS,
        photos: photos
    }
}
//thunk
export function loadUserPhotos(userId){
    return (dispatch, getState) => {
        let {photosMap} = getState().photos;
        let photosArr = photosMap.toArray();
        let max = 0;
        for (let i in photosArr){
            if (photosArr[i].timestamp > max && photosArr[i].userId == userId){
                max = photosArr[i].timestamp;
            }
        }
        dispatch(loadPhotos_())
        return PhotosAPI.getUserPhotos(userId, max).then(
            photos => dispatch(loadPhotosSuccess(photos)),
            error => dispatch(loadPhotosFail(error))
        )
    }
}


//CREATE
let createPhoto_ = () => {
    return {
        type: types.CREATE_PHOTO
    }
}
let createPhotoFail = (error) => {
    return {
        type: types.CREATE_PHOTO_FAIL,
        error: error
    }
}
let createPhotoSuccess = (photo) => {
    return {
        type: types.CREATE_PHOTO_SUCCESS,
        photo: photo
    }
}
//thunk
export function createPhoto(data){
    return (dispatch, getState) => {
        dispatch(createPhoto_());
        data.userId = getState().users.currentUserId;
        // AnalyticsHelper.logEvent(anConstants.TAKE_PHOTO);
        return ParseAPI.createObject('Photo', data, PhotosAPI.transformPhoto).then(
            photo => dispatch(createPhotoSuccess(photo)),
            error => dispatch(createPhotoFail(error))
        )
    }
}

//DELETE
let deletePhoto_ = () => {
    return {
        type: types.DELETE_PHOTO
    }
}
let deletePhotoFail = (error) => {
    return {
        type: types.DELETE_PHOTO_FAIL,
        error: error
    }
}
let deletePhotoSuccess = (id) => {
    return {
        type: types.DELETE_PHOTO_SUCCESS,
        id: id
    }
}
export function deletePhoto(id) {
    return (dispatch, getState) => {
        dispatch(deletePhoto_())
        return ParseAPI.runCloudFunctionAsPromise("deletePhoto", {id: id}).then(
            () => dispatch(deletePhotoSuccess(id)),
            error => dispatch(deletePhotoFail(error))
        )
    }
}

export function loadPhotosOfFriends(){
    return (dispatch, getState) => {
        dispatch(loadPhotos_());
        let usersIds = getState().users.linksMap.toArray().map((link) => {return link.creatorId});
        return ParseAPI.getFreshObjects('Photo', Map(), {containedIn: [['userId', usersIds]]}, PhotosAPI.transformPhoto).then(
            photos => dispatch(loadPhotosSuccess(photos)),
            err => dispatch(loadPhotosFail(err))
        )
    }
}

export function selectPhoto(photoId){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_PHOTO,
            id: photoId
        })
    }
}

export function unselectPhoto(photoId){
    return (dispatch, getState) => {
        return dispatch({
            type: types.UNSELECT_PHOTO,
        })
    }
}