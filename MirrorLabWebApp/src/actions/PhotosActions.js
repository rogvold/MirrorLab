/**
 * Created by sabir on 24.01.17.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';

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
        dispatch(loadPhotos_())
        return ParseAPI.runCloudFunctionAsPromise('loadUserPhotos', {userId: userId}).then(
            d => dispatch(loadPhotosSuccess(d.photos)),
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
        dispatch(createPhoto_())
        return ParseAPI.runCloudFunctionAsPromise("createPhoto", data).then(
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

let updatePhoto_ = () => {
    return {
        type: types.UPDATE_PHOTO
    }
}
let updatePhotoFail = (error) => {
    return {
        type: types.UPDATE_PHOTO_FAIL,
        error: error
    }
}
let updatePhotoSuccess = (photo) => {
    return {
        type: types.UPDATE_PHOTO_SUCCESS,
        photo: photo
    }
}
export function updatePhoto(data) {
    return (dispatch, getState) => {
        dispatch(updatePhoto_())
        return ParseAPI.runCloudFunctionAsPromise("updatePhoto", data).then(
            (photo) => dispatch(updatePhotoSuccess(photo)),
            error => dispatch(updatePhotoFail(error))
        )
    }
}