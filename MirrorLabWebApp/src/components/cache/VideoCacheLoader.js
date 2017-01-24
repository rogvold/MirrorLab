/**
 * Created by sabir on 07.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions/VideoCacheActions'

class VideoCacheLoader extends React.Component {

    static defaultProps = {
        interval: 1 * 1000,
        showData: false
    }

    static propTypes = {

    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.initTimer();
    }

    componentWillReceiveProps() {

    }

    componentDidUpdate = () => {
        this.props.loadVideoFromQueue();
    }

    render = () => {
        let {initialized, videosMap, loadingSet, queueSet, showData} = this.props;
        if (showData == false){
            return null;
        }

        return (
            <div>

                VideoCacheLoader: initialized = {JSON.stringify(initialized)}
                <br/>
                VideoCacheLoader: videosMap = {JSON.stringify(videosMap)}
                <br/>
                VideoCacheLoader: loadingSet = {JSON.stringify(loadingSet)}
                <br/>
                VideoCacheLoader: queueSet = {JSON.stringify(queueSet)}

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

VideoCacheLoader = connect(mapStateToProps, mapDispatchToProps)(VideoCacheLoader)

export default VideoCacheLoader