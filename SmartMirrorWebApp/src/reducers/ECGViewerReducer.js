/**
 * Created by sabir on 06.02.17.
 */

import * as types from '../constants/ActionTypes.js'
import {Map, OrderedMap, Set, List} from 'immutable';

const initialState = {
    sessionId: undefined,
    marker1Position: undefined,
    marker2Position: undefined,
    lineNumber: undefined
}


const ECGViewerReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SELECT_SESSION:
            return {
                ...state,
                sessionId: action.id
            }

        case types.UNSELECT_SESSION:
            return {
                ...state,
                sessionId: undefined,
                marker1Position: undefined,
                marker2Position: undefined,
                lineNumber: undefined
            }

        case types.SET_MARKER:
            let obj = {};
            if (action.markerNumber == 1){
                obj.marker1Position = action.position;
                obj.marker2Position = undefined;
            }
            if (action.markerNumber == 2){
                obj.marker2Position = action.position;
            }
            return {
                ...state,
                ...obj,
                lineNumber: action.lineNumber
            }

        case types.UNSET_MARKER:
            return {
                ...state,
                marker1Position: (action.markerNumber == 1) ? undefined : state.marker1Position,
                marker2Position: (action.markerNumber == 2) ? undefined : state.marker2Position
            }

        case types.UNSET_ALL_MARKERS:
            return {
                ...state,
                marker1Position: undefined,
                marker2Position: undefined
            }

        default:
            return state;
    }

}

export default ECGViewerReducer;