/**
 * Created by sabir on 09.01.17.
 */


import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';


const initialState = {
    playing: false,
    url: undefined,
    mode: 'video'
}


const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const VideoCacheReducer =  (state = initialState, action = {}) => {

    switch (action.type) {
        case types.PLAYER_PLAY:
            let st = Object.assign({}, {playing: true});
            if (action.url != undefined){
                st = Object.assign({}, {playing: true, url: action.url});
            }
            if (action.mode != undefined){
                st = Object.assign({}, st, {mode: mode});
            }
            return {
                ...state,
                ...st
            }
        case types.PLAYER_PAUSE:
            let st1 = Object.assign({}, {playing: false});
            if (action.url != undefined){
                st1 = Object.assign({}, {playing: false, url: action.url});
            }
            if (action.mode != undefined){
                st1 = Object.assign({}, st1, {mode: mode});
            }
            return {
                ...state,
                ...st1
            }
        case types.CHANGE_PLAYER_MODE:
            return {
                ...state,
                mode: action.mode
            }


        default:
            return state;
    }

}

export default VideoCacheReducer;
