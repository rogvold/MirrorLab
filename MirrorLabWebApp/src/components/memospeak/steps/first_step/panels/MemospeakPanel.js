/**
 * Created by sabir on 11.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ReactPlayer from 'react-player'

import * as cacheActions from '../../../../../actions/VideoCacheActions'

import CoolPreloader from '../../../../preloader/CoolPreloader'

import AttitudeButtonsPanel from './AttitudeButtonsPanel'


class MemospeakPanel extends React.Component {

    static defaultProps = {
        id: undefined,

        onPrev: () => {
            console.log('MemospeakPanel: default: onPrev occured');
        },

        onNext: () => {
            console.log('MemospeakPanel: default: onNext occured');
        }

    }

    static propTypes = {

    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.checkIfLoaded(this.props.id);
    }

    checkIfLoaded = (id) => {
        let {getMaterialCachedUrl, getMaterialById} = this.props;
        let m = getMaterialById(id);
        let cachedUrl = getMaterialCachedUrl(id);
        if (cachedUrl == undefined){
            if (m != undefined){
                this.props.cacheVideo(m.url);
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.checkIfLoaded(nextProps.id);
    }

    onNext = () => {
        this.props.onNext();
    }

    onPrev = () => {
        this.props.onPrev();
    }

    onLike = () => {
        console.log('onLike occured');
    }

    onCancel = () => {
        console.log('onLike onCancel');
    }

    render = () => {
        let {id, getMaterialCachedUrl, getMaterialById} = this.props;
        let cachedUrl = getMaterialCachedUrl(id);
        let m = getMaterialById(id);

        return (
            <div className={'memospeak_panel'} name={'memospeak_panel'} >

                <div className={'arrow_placeholder'} onClick={this.onPrev} >
                    <div className={'arrow_container'} >
                        <i className={'icon angle double left'} ></i>
                    </div>
                </div>
                <div className={'content_placeholder'} >
                    <div className={'left_section'} >

                        {cachedUrl == undefined ?
                            <CoolPreloader/> :
                            <div className={'player_placeholder'} >
                                <ReactPlayer url={cachedUrl} className={'react-player'} controls={true} playing={true} />
                            </div>
                        }

                    </div>

                    <div className={'right_section'} >

                        <div className={'name_placeholder'} >
                            <div className={'name'}>
                                {m.name}
                            </div>
                        </div>

                        {m.comment == undefined || m.comment.trim() == '' ? null :
                            <div className={'comment_placeholder'} >
                                <div className={'comment'} >
                                    {m.comment}
                                </div>
                            </div>
                        }

                        <div className={'bottom_buttons_placeholder'} >
                            <AttitudeButtonsPanel id={m.id} />
                        </div>

                    </div>
                </div>

                <div className={'arrow_placeholder'} onClick={this.onNext} >
                    <div className={'arrow_container'} >
                        <i className={'icon angle double right'} ></i>
                    </div>
                </div>
            </div>
        )
    }

}

let getMaterialById_ = (state, id) => {
    let {memospeaksMap} = state.memospeak;
    if (id == undefined){
        return undefined;
    }
    return memospeaksMap[id];
}

let getMaterialCachedUrl = (state, id) => {
    let material = getMaterialById_(state, id);
    if (material == undefined){
        return undefined;
    }
    let {videosMap} = state.videoCache;
    let obj = videosMap.get(material.url);
    if (obj == undefined){
        return undefined;
    }
    return obj.blob_uri;
}

let getMaterialAttitude = (state, id) => {
    let material = getMaterialById_(state, id);
    if (material == undefined){
        return undefined;
    }
    let {url} = material;
    let {attitudeMap} = state.steps;
    return attitudeMap.get(url);
}

const mapStateToProps = (state) => {
   return {
       getMaterialById: (id) => {
           return getMaterialById_(state, id);
       },
       getMaterialCachedUrl: (id) => {
            return getMaterialCachedUrl(state, id);
       },
       getAttitude: (id) => {
            return getMaterialAttitude(state, id)
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       // cacheActions
        cacheVideo: (url) => {
            return dispatch(cacheActions.addToQueue([url]));
        }
   }
}

MemospeakPanel = connect(mapStateToProps, mapDispatchToProps)(MemospeakPanel)

export default MemospeakPanel