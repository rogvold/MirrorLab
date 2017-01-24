/**
 * Created by sabir on 10.01.17.
 */

import * as types from '../constants/ActionTypes.js'

export function nextSlide(){
    return (dispatch, getState) => {
        let {slides, currentNumber} = getState().slides;

        if (slides == undefined || slides.length == 0){
            return dispatch({type: types.CHANGE_CURRENT_SLIDE_NUMBER, currentNumber: undefined});
        }

        if (slides.length - 1 == currentNumber){
            return dispatch({type: types.CHANGE_CURRENT_SLIDE_NUMBER, currentNumber: undefined}); //finishing
        }else {
            if (currentNumber != undefined){
                return dispatch({
                    type: types.CHANGE_CURRENT_SLIDE_NUMBER,
                    currentNumber: +currentNumber + 1
                });
            }else {
                return dispatch({
                    type: types.CHANGE_CURRENT_SLIDE_NUMBER,
                    currentNumber: 0
                });
            }
        }
    }
}

export function changeSlides(newSlides) {
    return (dispatch, getState) => {
        if (newSlides == undefined || newSlides.length == 0 ){
            return Promise.resolve();
        }
        return dispatch({
            type: types.CHANGE_SLIDES,
            slides: newSlides,
            currentNumber: 0
        });
    }
}

