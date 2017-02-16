/**
 * Created by sabir on 15.02.17.
 */



import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';


const initialState = {
    initialized: false,
    queueSet: OrderedSet(),
    loadingSet: Set(),
    photosMap: Map()
}


const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const UploadReducer =  (state = initialState, action = {}) => {

    switch (action.type) {


        case types.PUT_PHOTOS_IN_UPLOADING_SET:
            return {
                ...state,
                queueSet: state.queueSet.concat(action.urls)
            }

        case types.UPLOAD_PHOTO:
            return {
                ...state,
                queueSet: state.queueSet.delete(action.url),
                loadingSet: state.loadingSet.add(action.url)
            }
        case types.UPLOAD_PHOTO_FAIL:
            return {
                ...state,
                queueSet: state.queueSet.add(action.url),
                loadingSet: state.loadingSet.delete(action.url)
            }
        case types.UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                queueSet: state.queueSet.delete(action.url),
                loadingSet: state.loadingSet.delete(action.url),
                photosMap: state.photosMap.set(action.url, {data: action.data, url: action.url})
            }

        default:
            return state;
    }

}

export default UploadReducer;

