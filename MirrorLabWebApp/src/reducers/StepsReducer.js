/**
 * Created by sabir on 12.01.17.
 */


import * as types from '../constants/ActionTypes.js'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';

const initialState = {

    loading: false,
    attitudeMap: Map() // id - attitude

}


const StepsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.CHANGE_USER_MATERIAL_ATTITUDE:
            return {
                ...state,
                loading: true
            }
        case types.CHANGE_USER_MATERIAL_ATTITUDE_FAIL:
            return {
                ...state,
                loading: false
            }
        case types.CHANGE_USER_MATERIAL_ATTITUDE_SUCCESS:
            let data = action.data;
            return {
                ...state,
                loading: false,
                attitudeMap: state.attitudeMap.set(data.url, data.attitude)
            }

        case types.LOAD_ATTITUDE_MAP:
            return {
                ...state,
                loading: true
            }
        case types.LOAD_ATTITUDE_MAP_FAIL:
            return {
                ...state,
                loading: false
            }
        case types.LOAD_ATTITUDE_MAP_SUCCESS:
            return {
                ...state,
                loading: false,
                attitudeMap: Map(action.map)
            }

        default:
            return state;
    }

}

export default StepsReducer;
