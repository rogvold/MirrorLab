/**
 * Created by sabir on 07.01.17.
 */

import * as types from '../constants/ActionTypes.js'
import IndexDBHelper from '../helpers/IndexDBHelper'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';

let initializeDB_ = () => {
    return {
        type: types.INITIALIZE_VIDEO_DB
    }
}

let initializeDBFail = (err) => {
    return {
        type: types.INITIALIZE_VIDEO_DB_FAIL,
        error: err
    }
}

let initializeDBSuccess = (map) => {
    return {
        type: types.INITIALIZE_VIDEO_DB_SUCCESS,
        videosMap: map
    }
}
//thunk
export function initializeDB(){
    return (dispatch, getState) => {
        dispatch(initializeDB_())
        return IndexDBHelper.loadUrlBlobMapAsPromise().then(
            map => dispatch(initializeDBSuccess(map)),
            err => dispatch(initializeDBFail(err))
        )
    }
}

//add to queue
export function addToQueue(urls){
    return (dispatch, getState) => {
        let state = getState().videoCache;
        console.log('addToQueue: urls = ', urls);
        console.log('state = ', state);
        let urlsSet = Set(urls);
        console.log('addToQueue: urlsSet = ', urlsSet);
        if (urlsSet.isSubset(state.loadingSet) || urlsSet.isSubset(state.queueSet)){
            console.log('isSubset of loadingSet or queueSet');
            return Promise.resolve();
        }
        //todo: extract subset
        //todo: check videosMap
        dispatch({type: types.PUT_VIDEOS_IN_CACHING_SET, urls: urls});

        // if (state.videosMap.has(url) == true || state.loadingSet.has(url) || state.queueSet.has(url)){
        //     return Promise.resolve();
        // }

    }
}

//load videos
let loadVideo_ = (url) => {
    return {
        type: types.CACHE_VIDEO,
        url: url
    }
}
let loadVideoFail = (err) => {
    return {
        type: types.CACHE_VIDEO_FAIL,
        error: err
    }
}
let loadVideoSuccess = (url, blob_uri) => {
    return {
        type: types.CACHE_VIDEO_SUCCESS,
        url: url,
        blob_uri: blob_uri
    }
}
//thunk
export function loadVideoFromQueue() {
    return (dispatch, getState) => {
        let {queueSet} = getState().videoCache;
        if (queueSet.isEmpty() == true){
            return;
        }
        let url = queueSet.first();
        dispatch(loadVideo_(url));
        return IndexDBHelper.saveUrlToDb(url).then(
            obj => dispatch(loadVideoSuccess(obj.url, URL.createObjectURL(obj.blob))),
            error => dispatch(loadVideoFail(error))
        )
    }
}