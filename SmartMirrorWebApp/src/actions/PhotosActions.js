/**
 * Created by sabir on 14.02.17.
 */
import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';
import PhotosAPI from '../api/PhotosAPI';

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

export function loadFriendsPhotos() {
    return (getState, dispatch) => {
        let {photosMap} = getState().photos;
        let {usersMap, linksMap, currentUserId} = getState().users;
        let links = linksMap.toArray().filter((link) => {
            return (link.creatorId == currentUserId || link.friendId == currentUserId);
        });
        let usersIds = links.map((l) => {
            if (l.creatorId == currentUserId){
                return l.friendId;
            }else {
                return l.creatorId;
            }
        });
        if (usersIds.length == 0){
            return dispatch(loadPhotosSuccess([]));
        }
        dispatch(loadPhotos_());
        return ParseAPI.getFreshObjects('Photo', photosMap, {containedIn: [['objectId', usersIds]]}, PhotosAPI.transformPhoto).then(
            photos => dispatch(loadPhotosSuccess(photos)),
            err => dispatch(loadPhotosFail(err))
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
