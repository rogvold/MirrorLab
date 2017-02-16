/**
 * Created by sabir on 04.02.17.
 */

import * as types from '../constants/ActionTypes.js'
import {Map, OrderedMap, Set, List} from 'immutable';

const initialState = {
    initialized: false,
    loading: false,
    usersMap: Map(),
    currentUserId: undefined,
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const UsersReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGIN:
            return startLoading(state, action)

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false,
                currentUserId: action.user.id
            }

        case types.LOGIN_FAIL:
            return stopLoading(state, action)

        case types.SIGNUP:
            return startLoading(state, action)

        case types.SIGNUP_FAIL:
            return stopLoading(state, action)

        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                currentUserId: action.user.id,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false
            }


        case  types.LOGOUT:
            return startLoading(state, action)

        case  types.LOGOUT_FAIL:
            return stopLoading(state, action)

        case  types.LOGOUT_SUCCESS:
            return {...state, currentUserId: undefined, loading: false, error: undefined}

        case types.INITIALIZE_AUTH:
            return {...state, loading: true, initialized: false}

        case types.INITIALIZE_AUTH_FAIL:
            return {...state, loading: false, initialized: false}

        case types.INITIALIZE_AUTH_SUCCESS:
            return {...state,
                loading: false,
                initialized: true,
                currentUserId: (action.user == undefined) ? undefined : action.user.id,
                usersMap: (action.user == undefined) ? state.usersMap : state.usersMap.set(action.user.id, action.user)
            }


        case types.UPDATE_USER:
            return startLoading(state, action);
        case types.UPDATE_USER_FAIL:
            return stopLoading(state, action);
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                usersMap: state.usersMap.set(action.user.id, action.user)
            }


        case types.LOAD_USERS:
            return startLoading(state, action)

        case types.LOAD_USERS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                usersMap: state.usersMap.merge(action.users.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                loading: false
            }


        default:
            return state;

    }

}

export default UsersReducer;