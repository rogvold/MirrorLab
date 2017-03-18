/**
 * Created by sabir on 06.02.17.
 */
import * as types from '../constants/ActionTypes.js'
import {Map, OrderedMap, Set, List} from 'immutable';

const initialState = {
    loading: false,
    error: undefined,
    notesMap: Map()
}


const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const NotesReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.CREATE_NOTE:
            return startLoading(state, action);
        case types.CREATE_NOTE_FAIL:
            return stopLoading(state, action);
        case types.CREATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesMap: state.notesMap.set(action.note.id, action.note)
            }

        case types.UPDATE_NOTE:
            return startLoading(state, action);
        case types.UPDATE_NOTE_FAIL:
            return stopLoading(state, action);
        case types.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesMap: state.notesMap.set(action.note.id, action.note)
            }

        case types.DELETE_NOTE:
            return startLoading(state, action);
        case types.DELETE_NOTE_FAIL:
            return stopLoading(state, action);
        case types.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notesMap: state.notesMap.delete(action.id)
            }

        case types.LOAD_NOTES:
            return startLoading(state, action);
        case types.LOAD_NOTES_FAIL:
            return stopLoading(state, action);
        case types.LOAD_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notesMap: state.notesMap.merge(action.notes.reduce((map, note) => {return map.set(note.id, note)}, Map()))
            }

        default:
            return state;
    }

}

export default NotesReducer;