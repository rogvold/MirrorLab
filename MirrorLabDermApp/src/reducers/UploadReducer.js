/**
 * Created by sabir on 15.02.17.
 */



import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';


const initialState = {
    initialized: false,
    queueSet: Set(),
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

        case types.INITIALIZE_AUTH:
            return {
                ...state,
                loadingSet: Set(),
                queueSet: state.queueSet.merge(state.loadingSet)
            }

        case types.PUT_PHOTOS_IN_UPLOADING_SET:
            let urls = action.urls;
            let urlsSet = Set(urls);
            if (__DEV__){
                console.log('PUT_PHOTOS_IN_UPLOADING_SET: urlsSet = ', urlsSet);
            }
            let isLoading = urlsSet.isSubset(state.loadingSet);
            let isInQueue = urlsSet.isSubset(state.queueSet);
            if (__DEV__){
                console.log('isLoading, isInQueue = ', isLoading, isInQueue);
            }

            if (isLoading || isInQueue){
                return {
                    ...state
                }
            }
            if (__DEV__){
                console.log('trying to concat');
            }
            let newQueueSet = Set(state.queueSet.toArray().concat(action.urls));
            if (__DEV__){
                console.log('newQueueSet = ', newQueueSet);
            }
            return {
                ...state,
                queueSet: newQueueSet
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

        case types.LOGOUT:
            return {
                ...state,
                loadingSet: Set()
            }

        default:
            return state;
    }

}

export default UploadReducer;

