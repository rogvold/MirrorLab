/**
 * Created by sabir on 09.01.17.
 */

import * as types from '../constants/ActionTypes.js'

export function play(url, mode) {
    return (dispatch, getState) => {
        dispatch({
            type: types.PLAYER_PLAY,
            url: url,
            mode: mode
        });
    }
}

export function pause(url, mode) {
    return (dispatch, getState) => {
        dispatch({
            type: types.PLAYER_PAUSE,
            url: url,
            mode: mode
        });
    }
}

export function changeMode(mode) {
    return (dispatch, getState) => {
        dispatch({
            type: types.CHANGE_PLAYER_MODE,
            mode: mode
        });
    }
}