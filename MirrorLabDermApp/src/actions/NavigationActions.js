/**
 * Created by sabir on 13.02.17.
 */
import * as types from '../constants/ActionTypes.js'

export function switchTab(tab){
    return {
        type: types.SWITCH_TAB,
        tab: tab
    }
}
