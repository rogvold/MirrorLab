/**
 * Created by sabir on 10.01.17.
 */


import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';


const initialState = {
    slides: [],
    currentNumber: undefined
}


const SlidesReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.CHANGE_CURRENT_SLIDE_NUMBER:
            return {
                ...state,
                currentNumber: action.currentNumber
            }

        case types.CHANGE_SLIDES:
            return {
                ...state,
                slides:action.slides,
                currentNumber: 0
            }


        default:
            return state;
    }

}

export default SlidesReducer;
