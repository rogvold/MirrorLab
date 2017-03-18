/**
 * Created by sabir on 14.02.17.
 */

import {Map, Stack, Set} from 'immutable'
import * as types from '../constants/ActionTypes.js'

const initialState = {
    loading: false,
    photosMap: Map(),
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const PhotosReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: Map()
            }

        case types.LOAD_PHOTOS:
            return startLoading(state, action)
        case types.LOAD_PHOTOS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_PHOTOS_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: state.photosMap.merge(action.photos.reduce((map, photo) => {return map.set(photo.id, photo)}, Map()))
            }

        case types.CREATE_PHOTO:
            return startLoading(state, action)
        case types.CREATE_PHOTO_FAIL:
            return stopLoading(state, action)
        case types.CREATE_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: state.photosMap.set(action.photo.id, action.photo)
            }


        case types.DELETE_PHOTO:
            return startLoading(state, action)
        case types.DELETE_PHOTO_FAIL:
            return stopLoading(state, action)
        case types.DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photosMap: state.photosMap.delete(action.id)
            }

        case types.LOGOUT:
            return {
                ...state,
                loading: false
            }


        default:
            return state;
    }

}

export default PhotosReducer;
