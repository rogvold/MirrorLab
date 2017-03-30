/**
 * Created by sabir on 28.03.17.
 */

import * as types from '../constants/ActionTypes.js'

export function setLang(lang){
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_LANG,
            lang: lang
        });
    }
}