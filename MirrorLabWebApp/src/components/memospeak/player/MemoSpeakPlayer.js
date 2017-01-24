/**
 * Created by sabir on 09.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/PlayerActions'

import ReactPlayer from 'react-player'

class MemoSpeakPlayer extends React.Component {

    static defaultProps = {
        onEnded: () => {
            console.log('default: onEnded occured');
        },
        audioMode: false,
        playing: true
    }

    static propTypes = {
        audioMode: PropTypes.bool.isRequired,
        playing: PropTypes.bool
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

    onEnded = () => {
        this.props.onEnded();
    }

    render = () => {
        let {getCachedUrl, url, audioMode, playing} = this.props;
        let cachedUrl = getCachedUrl(url);

        console.log('rendering MemoSpeakPlayer: url, cachedUrl = ', url, cachedUrl);

        if (cachedUrl == undefined){
            return null;
        }

        return (
            <div className="video_placeholder" style={(audioMode == true) ? {width: 0, height: 0, display: 'none'} : {} }  >
                <ReactPlayer url={cachedUrl}
                             onEnded={this.onEnded}
                             playing={playing} className={'memo_speak_video_player'} />
            </div>
        )
    }

}

//warning: render this player as soon as you have everything preloaded

let getCachedUrl = (state, url) => {
    if (url == undefined){
        return undefined;
    }
    let videosMap = state.videoCache.videosMap;
    let obj = videosMap.get(url);
    if (obj == undefined){
        return undefined;
    }
    return obj.blob_uri;
}

const mapStateToProps = (state) => {
   return {
       getCachedUrl: (url) => {
           return getCachedUrl(state, url)
       }
   }
}

const mapDispatchToProps = (dispatch) => {

   return {
       // play: function(url, mode){
       //     return dispatch(actions.play(url, mode));
       // },
       // pause: function(url, mode){
       //     return dispatch(actions.pause(url, mode));
       // },
       // changeMode: function(mode){
       //     return dispatch(actions.changeMode(mode))
       // }
   }
}

MemoSpeakPlayer = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakPlayer)

export default MemoSpeakPlayer