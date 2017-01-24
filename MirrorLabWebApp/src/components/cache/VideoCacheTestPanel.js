/**
 * Created by sabir on 07.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions/VideoCacheActions'

class VideoCacheTestPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        url: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onClick = () => {
        this.props.addToQueue([this.state.url]);
    }

    onTest2 = () => {
        let urls = ['https://www.englishpatientdrive.pw/dropzone/uploads/UbsIDLKNVBuAtwhy9uuT.mp4',
                     'https://www.englishpatientdrive.pw/dropzone/uploads/XQ3RpIBWeDELLPC40y92.mp4',
            'https://www.englishpatientdrive.pw/dropzone/uploads/wP7vysnUmVODGHIJuv8Q.mp4',
            'https://www.englishpatientdrive.pw/dropzone/uploads/N4WcRP63ngiBueNBEAaN.mp4'
        ];
        this.props.addToQueue(urls);
    }

    render = () => {
        let {url} = this.state;

        return (
            <div>

                <div className={'ui form'} >


                    <input onChange={(evt) => {this.setState({url: evt.target.value})}} value={url} />

                    {url == undefined || url.trim() == '' ? null :
                        <button className={'ui button'} onClick={this.onClick} >
                            add to queue
                        </button>
                    }

                    <button onClick={this.onTest2}  >
                        test2
                    </button>

                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        initialized: state.videoCache.initialized,
        videosMap: state.videoCache.videosMap,
        loadingSet: state.videoCache.loadingSet,
        queueSet: state.videoCache.queueSet
    }
}

const mapDispatchToProps = (dispatch) => {
    let boundActionCreators = bindActionCreators(actions, dispatch)
    return {
        ...boundActionCreators
    }
}

VideoCacheTestPanel = connect(mapStateToProps, mapDispatchToProps)(VideoCacheTestPanel)

export default VideoCacheTestPanel