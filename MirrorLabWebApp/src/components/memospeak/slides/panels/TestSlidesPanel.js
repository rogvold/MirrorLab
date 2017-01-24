/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MemoSpeakSlidesPanel from './MemoSpeakSlidesPanel'

import * as actions from '../../../../actions/SlidesActions'

import MemoSpeakHelper from '../../../../helpers/MemoSpeakHelper'

class TestSlidesPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        changeSlides: PropTypes.func.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    testIt = () => {

        let materials = [
            {
                url: 'https://www.englishpatientdrive.pw/dropzone/uploads/BKyU9TBNdkLWhz0nQ0tE.mp4',
                text: 'We had the accident',
                imageUrl: 'https://i.vimeocdn.com/video/564661552_200x150.jpg'
            }, {
                url: 'https://www.englishpatientdrive.pw/dropzone/uploads/QmbXp0FSOdW4OEz3KgdJ.m4v',
                text: 'I never liked these curtains. Set them on fire in my fourth year. By accident, of course.',
                imageUrl: 'https://i.vimeocdn.com/video/554624834_200x150.jpg'
            },
            {
                url: 'https://www.englishpatientdrive.pw/dropzone/uploads/MsC86Gss7aUyVuQTSj1U.mp4',
                text: 'Football 2016',
                imageUrl: 'https://i.vimeocdn.com/video/550983851_200x150.jpg',
            }
        ];
        materials = this.props.materials;
        this.props.changeSlides(MemoSpeakHelper.getSlidesForSecondStep(materials, 300));
    }

    render = () => {

        return (
            <div>

                <MemoSpeakSlidesPanel />

                <button onClick={this.testIt} >
                    test it!
                </button>

            </div>
        )
    }

}

let getMaterials = (state) => {
    let arr = [];
    let map = state.memospeak.memospeaksMap;
    for (var key in map){
        let m = map[key];
        arr.push(Object.assign({}, m, {text: m.transcript}));
    }
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp)
    })
    return arr;
}

const mapStateToProps = (state) => {
   return {
        materials: getMaterials(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       changeSlides: (newSlides) => {
           return dispatch(actions.changeSlides(newSlides));
       }
   }
}

TestSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(TestSlidesPanel)

export default TestSlidesPanel