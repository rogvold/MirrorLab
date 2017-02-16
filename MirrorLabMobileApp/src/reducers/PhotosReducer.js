/**
 * Created by sabir on 14.02.17.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    loading: false,
    photosMap: {},
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumePhotos = (state, photos) => {
    if (photos == undefined){
        return state;
    }
    let photosMap = Object.assign({}, state.photosMap);
    for (let a of photos){
        photosMap[a.id] = a;
    }
    return Object.assign({}, state.photosMap, photosMap);
}

const deletePhoto = (state, photoId) => {
    if (photoId == undefined){
        return state.photosMap;
    }
    let map = Object.assign({}, state.photosMap);
    for (let key in map){
        if (key == undefined){
            continue;
        }
        if (key == photoId){
            map[key] = undefined;
        }
    }
    return map;
}

const PhotosReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_PHOTOS:
            return startLoading(state, action)
        case types.LOAD_PHOTOS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_PHOTOS_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: consumePhotos(state, action.photos)
            }

        case types.CREATE_PHOTO:
            return startLoading(state, action)
        case types.CREATE_PHOTO_FAIL:
            return stopLoading(state, action)
        case types.CREATE_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: consumePhotos(state, [action.photo])
            }


        case types.DELETE_PHOTO:
            return startLoading(state, action)
        case types.DELETE_PHOTO_FAIL:
            return stopLoading(state, action)
        case types.DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: deletePhoto(state, action.id)
            }


        default:
            return state;
    }

}

export default PhotosReducer;
