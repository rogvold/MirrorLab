/**
 * Created by sabir on 15.02.17.
 */

import * as types from '../constants/ActionTypes.js'

import UploadHelper from '../helpers/UploadHelper'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';

import * as photosActions from '../actions/PhotosActions'

let putPhotosInUploadingSet = (urls) => {
    return (dispatch, getState) => {
        return dispatch({
            type: types.PUT_PHOTOS_IN_UPLOADING_SET,
            urls: urls
        })
    }
}

//add to queue
export function addToQueue(urls){
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            resolve(dispatch(putPhotosInUploadingSet(urls)))
        })
    }
}

//upload photos
let uploadPhoto_ = (url) => {
    return {
        type: types.UPLOAD_PHOTO,
        url: url
    }
}
let uploadPhotoFail = (err) => {
    return {
        type: types.UPLOAD_PHOTO_FAIL,
        error: err
    }
}
let uploadPhotoSuccess = (url, data) => {
    return {
        type: types.UPLOAD_PHOTO_SUCCESS,
        url: url,
        data: data
    }
}
//thunk
export function uploadPhotoFromQueue() {
    if (__DEV__){
        console.log('uploadPhotoFromQueue occured');
    }

    return (dispatch, getState) => {
        let {queueSet} = getState().upload;

        if (__DEV__){
            console.log('queueSet.toJS() = ', queueSet.toJS());
        }

        if (queueSet.isEmpty() == true){
            return;
        }
        let url = queueSet.first();
        let currentUserId = getState().users.currentUserId;
        dispatch(uploadPhoto_(url));
        return UploadHelper.uploadPhotoAsPromise(url).then(
            data => {
                data.userId = currentUserId;
                dispatch(uploadPhotoSuccess(url, data));
                return dispatch(photosActions.createPhoto(data));
            },
            error => dispatch(uploadPhotoFail(error))
        )
    }
}