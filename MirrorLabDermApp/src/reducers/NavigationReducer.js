/**
 * Created by sabir on 13.02.17.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    tab: 'index',

    camera: false

}

const NavigationReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SWITCH_TAB:
            return {...state, tab: action.tab}

        case types.OPEN_CAMERA:
            return {
                ...state,
                camera: true
            }

        case types.CLOSE_CAMERA:
            return {
                ...state,
                camera: false
            }

        default:
            return state;
    }

}

export default NavigationReducer;
