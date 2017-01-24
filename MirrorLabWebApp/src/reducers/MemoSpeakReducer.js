/**
 * Created by sabir on 02.01.17.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    loading: false,
    memospeaksMap: {},
    answersMap: {},
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeMemospeaks = (state, memospeaks) => {
    if (memospeaks == undefined){
        return state;
    }
    let memospeaksMap = Object.assign({}, state.memospeaksMap);
    for (let a of memospeaks){
        memospeaksMap[a.id] = Object.assign({}, a, {text: a.transcript});
    }
    return Object.assign({}, state.memospeaksMap, memospeaksMap);
}

const consumeAnswers = (state, answers) => {
    if (answers == undefined){
        return state;
    }
    let answersMap = Object.assign({}, state.answersMap);
    for (let a of answers){
        answersMap[a.id] = a;
    }
    return Object.assign({}, state.answersMap, answersMap);
}

const deleteMemospeak = (state, id) => {
    if (id == undefined){
        return state.memospeaksMap;
    }
    let map = Object.assign({}, state.memospeaksMap);
    for (let key in map){
        if (key == undefined){
            continue;
        }
        if (key == id){
            map[key] = undefined;
        }
    }
    return map;
}

const MemoSpeakReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_MEMOSPEAK_MATERIALS:
            return startLoading(state, action)
        case types.LOAD_MEMOSPEAK_MATERIALS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_MEMOSPEAK_MATERIALS_SUCCESS:
            return {
                ...state,
                loading: false,
                memospeaksMap: consumeMemospeaks(state, action.memospeaks)
            }

        case types.CREATE_MEMOSPEAK_MATERIAL:
            return startLoading(state, action)
        case types.CREATE_MEMOSPEAK_MATERIAL_FAIL:
            return stopLoading(state, action)
        case types.CREATE_MEMOSPEAK_MATERIAL_SUCCESS:
            return {
                ...state,
                loading: false,
                memospeaksMap: consumeMemospeaks(state, [action.memospeak])
            }

        case types.UPDATE_MEMOSPEAK_MATERIAL:
            return startLoading(state, action)
        case types.UPDATE_MEMOSPEAK_MATERIAL_FAIL:
            return stopLoading(state, action)
        case types.UPDATE_MEMOSPEAK_MATERIAL_SUCCESS:
            return {
                ...state,
                loading: false,
                memospeaksMap: consumeMemospeaks(state, [action.memospeak])
            }

        case types.DELETE_MEMOSPEAK_MATERIAL:
            return startLoading(state, action)
        case types.DELETE_MEMOSPEAK_MATERIAL_FAIL:
            return stopLoading(state, action)
        case types.DELETE_MEMOSPEAK_MATERIAL_SUCCESS:
            return {
                ...state,
                loading: false,
                memospeaksMap: deleteMemospeak(state, action.id)
            }

        case types.LOAD_MEMOSPEAK_USER_ANSWERS:
            return startLoading(state, action)
        case types.LOAD_MEMOSPEAK_USER_ANSWERS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_MEMOSPEAK_USER_ANSWERS_SUCCESS:
            return {
                ...state,
                loading: false,
                answersMap: consumeAnswers(state, action.answers)
            }

        case types.SAVE_MEMOSPEAK_ANSWERS:
            return startLoading(state, action)
        case types.SAVE_MEMOSPEAK_ANSWERS_FAIL:
            return stopLoading(state, action)
        case types.SAVE_MEMOSPEAK_ANSWERS_SUCCESS:
            return {
                ...state,
                loading: false,
                answersMap: consumeAnswers(state, [action.answer])
            }

        default:
            return state;
    }

}

export default MemoSpeakReducer;
