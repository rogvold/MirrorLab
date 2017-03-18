/**
 * Created by sabir on 06.02.17.
 */

import * as types from '../constants/ActionTypes.js'

export function selectSession(sessionId){
    return {
        type: types.SELECT_SESSION,
        id: sessionId
    }
}

export function unselectSession(){
    return {
        type: types.UNSELECT_SESSION
    }
}

export function setMarker(lineNumber, markerNumber, time){
    return {
        type: types.SET_MARKER,
        markerNumber: markerNumber,
        lineNumber: lineNumber,
        position: time
    }
}

export function unsetMarker(lineNumber, markerNumber){
    return {
        type: types.UNSET_MARKER,
        markerNumber: markerNumber,
        lineNumber: lineNumber
    }
}

export function unsetAllMarkers(lineNumber){
    return {
        type: types.UNSET_ALL_MARKERS,
        lineNumber: lineNumber
    }
}