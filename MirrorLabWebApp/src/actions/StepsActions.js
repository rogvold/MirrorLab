/**
 * Created by sabir on 12.01.17.
 */

import * as types from '../constants/ActionTypes.js'

import IndexDBHelper from '../helpers/IndexDBHelper'

let loadAttitudesMap_ = () => {
    return {
        type: types.LOAD_ATTITUDE_MAP
    }
}
let loadAttitudesMapFail = (err) => {
    return {
        type: types.LOAD_ATTITUDE_MAP_FAIL,
        error: err
    }
}
let loadAttitudesMapSuccess = (map) => {
    return {
        type: types.LOAD_ATTITUDE_MAP_SUCCESS,
        map: map
    }
}
//thunk
export function loadAttitudesMap(){
    return (dispatch, getState) => {
        dispatch(loadAttitudesMap_())
        return IndexDBHelper.loadAttitudesMapAsPromise().then(
            map => dispatch(loadAttitudesMapSuccess(map)),
            err => dispatch(loadAttitudesMapFail(err))
        )
    }
}

let saveAttitude_ = () => {
    return {
        type: types.CHANGE_USER_MATERIAL_ATTITUDE
    }
}
let saveAttitudeFail = (err) => {
    return {
        type: types.CHANGE_USER_MATERIAL_ATTITUDE_FAIL,
        error: err
    }
}
let saveAttitudeSuccess = (data) => {
    return {
        type: types.CHANGE_USER_MATERIAL_ATTITUDE_SUCCESS,
        data: data
    }
}
//thunk
export function saveAttitude(url, attitude) {
    return (dispatch, getState) => {
        dispatch(saveAttitude_())
        return IndexDBHelper.saveUserAttitude(url, attitude).then(
            data => dispatch(saveAttitudeSuccess(data)),
            err => dispatch(saveAttitudeFail(err))
        )
    }
}