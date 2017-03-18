/**
 * Created by sabir on 06.02.17.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';


//CREATE NOTE
let createNote_ = () => {
    return {
        type: types.CREATE_NOTE
    }
}
let createNoteFail = (err) => {
    return {
        type: types.CREATE_NOTE_FAIL,
        error: err
    }
}
let createNoteSuccess = (note) => {
    return {
        type: types.CREATE_NOTE_SUCCESS,
        note: note
    }
}

//thunk
export function createNote(data){
    if (data == undefined){
        return undefined;
    }
    return (dispatch, getState) => {
        dispatch(createNote_());
        return ParseAPI.runCloudFunctionAsPromise("createNote", data).then(
            note => dispatch(createNoteSuccess(note)),
            err => dispatch(createNoteFail(err))
        )
    }
}

//UPDATE NOTE
let updateNote_ = () => {
    return {
        type: types.UPDATE_NOTE
    }
}
let updateNoteFail = (err) => {
    return {
        type: types.UPDATE_NOTE_FAIL,
        error: err
    }
}
let updateNoteSuccess = (note) => {
    return {
        type: types.UPDATE_NOTE_SUCCESS,
        note: note
    }
}

//thunk
export function updateNote(data){
    if (data == undefined){
        return undefined;
    }
    return (dispatch, getState) => {
        dispatch(updateNote_());
        return ParseAPI.runCloudFunctionAsPromise("updateNote", data).then(
            note => dispatch(updateNoteSuccess(note)),
            err => dispatch(updateNoteFail(err))
        )
    }
}

//DELETE NOTE
let deleteNote_ = () => {
    return {
        type: types.DELETE_NOTE
    }
}
let deleteNoteFail = (err) => {
    return {
        type: types.DELETE_NOTE_FAIL,
        error: err
    }
}
let deleteNoteSuccess = (id) => {
    return {
        type: types.DELETE_NOTE_SUCCESS,
        id: id
    }
}

//thunk
export function deleteNote(id){
    if (id == undefined){
        return undefined;
    }
    return (dispatch, getState) => {
        dispatch(deleteNote_());
        return ParseAPI.runCloudFunctionAsPromise("deleteNote", {id: id}).then(
            note => dispatch(deleteNoteSuccess(id)),
            err => dispatch(deleteNoteFail(err))
        )
    }
}

//LOAD_NOTES
let loadNotes_ = () => {
    return {
        type: types.LOAD_NOTES
    }
}
let loadNotesFail = (err) => {
    return {
        type: types.LOAD_NOTES_FAIL,
        error: err
    }
}
let loadNotesSuccess = (notes) => {
    return {
        type: types.LOAD_NOTES_SUCCESS,
        notes: notes
    }
}
//thunk
export function loadUserNotes(userId){
    console.log('loadUserNotes occured: userId = ', userId);
    return (dispatch, getState) => {
        if (userId == undefined){
            return Promise.resolve();
        }
        dispatch(loadNotes_());
        return ParseAPI.runCloudFunctionAsPromise("loadUserNotes", {userId: userId}).then(
            notes => dispatch(loadNotesSuccess(notes)),
            err => dispatch(loadNotesFail(err))
        )
    }
}