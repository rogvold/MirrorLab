/**
 * Created by sabir on 03.01.17.
 */

import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';


const initialState = {
    initialized: false,

    queueSet: OrderedSet(),
    loadingSet: Set(),
    videosMap: Map()
}


const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const VideoCacheReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.INITIALIZE_VIDEO_DB:
            return {
                ...state,
                initialized: false
            }

        case types.INITIALIZE_VIDEO_DB_FAIL:
            return {
                ...state,
                initialized: false
            }

        case types.INITIALIZE_VIDEO_DB_SUCCESS:
            return {
                ...state,
                initialized: true,
                videosMap: new Map(action.videosMap)
            }

        case types.PUT_VIDEOS_IN_CACHING_SET:
            return { //todo: finish
                ...state,
                queueSet: state.queueSet.concat(action.urls)
            }

        case types.CACHE_VIDEO:
            return {
                ...state,
                queueSet: state.queueSet.delete(action.url),
                loadingSet: state.loadingSet.add(action.url)
            }
        case types.CACHE_VIDEO_FAIL:
            return {
                ...state,
                queueSet: state.queueSet.add(action.url),
                loadingSet: state.loadingSet.delete(action.url)
            }
        case types.CACHE_VIDEO_SUCCESS:
            return {
                ...state,
                queueSet: state.queueSet.delete(action.url),
                loadingSet: state.loadingSet.delete(action.url),
                videosMap: state.videosMap.set(action.url, {blob_uri: action.blob_uri, url: action.url})
            }


        default:
            return state;
    }

}

export default VideoCacheReducer;
