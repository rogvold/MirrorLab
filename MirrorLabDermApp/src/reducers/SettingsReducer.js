/**
 * Created by sabir on 28.03.17.
 */
import {Map, Stack, Set} from 'immutable'
import * as types from '../constants/ActionTypes.js'

const initialState = {
    lang: 'en'
}

const SettingsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SET_LANG:
            return {
                ...state,
                lang: action.lang
            }


        default:
            return state;
    }

}

export default SettingsReducer;