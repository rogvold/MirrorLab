/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../actions/SlidesActions'
import * as cacheActions from '../../../../actions/VideoCacheActions'

import SlidePanel from './SlidePanel'

import {Set, OrderedSet, Map, Stack, Iterable} from 'immutable';

class MemoSpeakSlidesPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadVideos(this.props.allSlidesVideoUrls);
    }

    componentWillReceiveProps = (nextProps) => {
        let prevAllSlidesVideoUrls = this.props.allSlidesVideoUrls;
        let newAllSlidesVideoUrls = nextProps.allSlidesVideoUrls;
        if (Set(prevAllSlidesVideoUrls).equals(Set(newAllSlidesVideoUrls)) == true){
            return;
        }
        this.props.loadVideos(newAllSlidesVideoUrls);
    }

    onSlideEnded = () => {
        this.props.nextSlide();
    }

    getProgress = () => {
        let {progress} = this.props;
        if (progress == 0){
            return null;
        }
        let s = Math.round(progress);
        return (
            <div className={'ui black inverted progress'}>
                <div className={'bar'} style={{width: progress + '%'}} >
                    <div className={'progress'}>{s}%</div>
                </div>
            </div>
        )
    }

    render = () => {
        let {currentSlide, progress} = this.props;
        console.log('MemoSpeakSlidesPanel: render: currentSlide, progress = ', currentSlide, progress);

        return (
            <div className={'memo_speak_slides_panel'} >

                {progress == 0 ? null :
                    <div className={'progress_placeholder'} >
                        {this.getProgress()}
                    </div>
                }

                {currentSlide == undefined ? null :
                    <SlidePanel presentationArray={currentSlide.presentationArray}
                                url={currentSlide.url}
                                text={currentSlide.text}
                                imageUrl={currentSlide.imageUrl}

                                pauseDuration={currentSlide.pauseDuration}
                                onSlideEnded={this.onSlideEnded}
                    />
                }

            </div>
        )
    }

}

let getCurrentSlide = (state) => {
    let {slides, currentNumber} = state.slides;
    // console.log('getCurrentSlide occured: slides, currentNumber = ', slides, currentNumber);
    if (currentNumber == undefined || slides == undefined || slides.length == 0 || currentNumber < 0 || currentNumber > slides.length - 1){
        return undefined;
    }
    return slides[currentNumber];
}

let getAllVideoSlideUrls = (state) => {
    let urls = [];
    let {slides} = state.slides;
    let map = {};
    for (var i in slides){
        var sl = slides[i];
        if (sl == undefined || sl.url == undefined){
            continue;
        }
        map[sl.url] = sl.url;
    }
    for (var key in map){
        urls.push(key);
    }
    return urls;
}

let getProgress = (state) => {
    let {slides, currentNumber} = state.slides;
    if (currentNumber == undefined){
        return 0;
    }
    let k = +currentNumber + 1;
    let n = slides.length;
    if (n == 0){
        return 0;
    }
    return (100.0 * k / n);
}

const mapStateToProps = (state) => {
   return {
       ...state.slides,
       currentSlide: getCurrentSlide(state),
       allSlidesVideoUrls: getAllVideoSlideUrls(state),
       progress: getProgress(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       nextSlide: () => {
           return dispatch(actions.nextSlide())
       },
       loadVideos: (urls) => {
            return dispatch(cacheActions.addToQueue(urls))
       }
   }
}

MemoSpeakSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakSlidesPanel)

export default MemoSpeakSlidesPanel