/**
 * Created by sabir on 02.01.17.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';

//LOAD
let loadMemospeaks_ = () => {
    return {
        type: types.LOAD_MEMOSPEAK_MATERIALS
    }
}
let loadMemospeaksFail = (error) => {
    return {
        type: types.LOAD_MEMOSPEAK_MATERIALS_FAIL,
        error: error
    }
}
let loadMemospeaksSuccess = (memospeaks) => {
    return {
        type: types.LOAD_MEMOSPEAK_MATERIALS_SUCCESS,
        memospeaks: memospeaks
    }
}
//thunk
export function loadMemospeaks(){
    return (dispatch, getState) => {
        dispatch(loadMemospeaks_())
        return ParseAPI.runCloudFunctionAsPromise('loadAllMemoSpeaks', {}).then(
            memospeaks => dispatch(loadMemospeaksSuccess(memospeaks)),
            error => dispatch(loadMemospeaksFail(error))
        )
    }
}

//CREATE
let createMemospeak_ = () => {
    return {
        type: types.CREATE_MEMOSPEAK_MATERIAL
    }
}
let createMemospeakFail = (error) => {
    return {
        type: types.CREATE_MEMOSPEAK_MATERIAL_FAIL,
        error: error
    }
}
let createMemospeakSuccess = (memospeak) => {
    return {
        type: types.CREATE_MEMOSPEAK_MATERIAL_SUCCESS,
        memospeak: memospeak
    }
}
//thunk
export function createMemospeak(data){
    return (dispatch, getState) => {
        dispatch(createMemospeak_())
        return ParseAPI.runCloudFunctionAsPromise('createMemoSpeakMaterial', data).then(
            memospeak => dispatch(createMemospeakSuccess(memospeak)),
            error => dispatch(createMemospeakFail(error))
        )
    }
}

//UPDATE
let updateMemospeak_ = () => {
    return {
        type: types.UPDATE_MEMOSPEAK_MATERIAL
    }
}
let updateMemospeakFail = (error) => {
    return {
        type: types.UPDATE_MEMOSPEAK_MATERIAL_FAIL,
        error: error
    }
}
let updateMemospeakSuccess = (memospeak) => {
    return {
        type: types.UPDATE_MEMOSPEAK_MATERIAL_SUCCESS,
        memospeak: memospeak
    }
}
//thunk
export function updateMemospeak(data){
    return (dispatch, getState) => {
        dispatch(updateMemospeak_())
        return ParseAPI.runCloudFunctionAsPromise('updateMemoSpeakMaterial', data).then(
            memospeak => dispatch(updateMemospeakSuccess(memospeak)),
            error => dispatch(updateMemospeakFail(error))
        )
    }
}

//DELETE
let deleteMemospeak_ = () => {
    return {
        type: types.DELETE_MEMOSPEAK_MATERIAL
    }
}
let deleteMemospeakFail = (error) => {
    return {
        type: types.DELETE_MEMOSPEAK_MATERIAL_FAIL,
        error: error
    }
}
let deleteMemospeakSuccess = (id) => {
    return {
        type: types.DELETE_MEMOSPEAK_MATERIAL_SUCCESS,
        id: id
    }
}
//thunk
export function deleteMemospeak(data){
    return (dispatch, getState) => {
        dispatch(deleteMemospeak_())
        return ParseAPI.runCloudFunctionAsPromise('deleteMemoSpeakMaterial', data).then(
            () => dispatch(deleteMemospeakSuccess(data.id)),
            error => dispatch(deleteMemospeakFail(error))
        )
    }
}

//----   answers section   ----
//LOAD
let loadUserAnswers_ = () => {
    return {
        type: types.LOAD_MEMOSPEAK_USER_ANSWERS
    }
}
let loadUserAnswersFail = (error) => {
    return {
        type: types.LOAD_MEMOSPEAK_USER_ANSWERS_FAIL,
        error: error
    }
}
let loadUserAnswersSuccess = (answers) => {
    return {
        type: types.LOAD_MEMOSPEAK_USER_ANSWERS_SUCCESS,
        answers: answers
    }
}
//thunk
export function loadUserAnswers(userId) {
    return (dispatch, getState) => {
        dispatch(loadUserAnswers_())
        return ParseAPI.runCloudFunctionAsPromise('loadUserMemoSpeakAnswers', {userId: userId}).then(
            answers => dispatch(loadUserAnswersSuccess(answers)),
            error => dispatch(loadUserAnswersFail(error))
        )
    }
}

//SAVE
let saveAnswers_ = () => {
    return {
        type: types.SAVE_MEMOSPEAK_ANSWERS
    }
}
let saveAnswersFail = (error) => {
    return {
        type: types.SAVE_MEMOSPEAK_ANSWERS_FAIL,
        error: error
    }
}
let saveAnswersSuccess = (answers) => {
    return {
        type: types.SAVE_MEMOSPEAK_ANSWERS_SUCCESS,
        answers: answers
    }
}
//thunk
export function saveAnswers(data) {
    return (dispatch, getState) => {
        dispatch(saveAnswers_())
        return ParseAPI.runCloudFunctionAsPromise('saveMemoSpeakAnswers', data).then(
            answers => dispatch(saveAnswersSuccess(answers)),
            error => dispatch(saveAnswersFail(error))
        )
    }
}
