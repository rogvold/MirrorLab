/**
 * Created by sabir on 13.02.17.
 */
import * as types from '../constants/ActionTypes.js'

export function switchTab(tab){
    return {
        type: types.SWITCH_TAB,
        tab: tab
    }
}

export function openCamera() {
    return (dispatch, getState) => {
        return dispatch({
            type: types.OPEN_CAMERA
        })
    }
}

export function closeCamera() {
    return (dispatch, getState) => {
        return dispatch({
            type: types.CLOSE_CAMERA
        })
    }
}
