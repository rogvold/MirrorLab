/**
 * Created by sabir on 09.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/VideoCacheActions'
import * as playerActions from '../../../actions/PlayerActions'

import MemoSpeakPlayer from './MemoSpeakPlayer'

class MemoSpeakPlayerTestPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onUpdate = () => {
        let {url} = this.state;
        this.props.changeUrl(url);
    }

    render = () => {
        let {url, mode} = this.state;

        return (
            <div>

                <div className="ui form" >

                    <div className="field">
                        <label>
                            url
                        </label>
                        <input onChange={(evt) => {this.setState({url: evt.target.value});}} value={url} />
                    </div>

                    <div className="field">
                        <label>
                            mode
                        </label>
                        <input onChange={(evt) => {this.setState({mode: evt.target.value})}} value={mode} />
                    </div>

                    <button className={'ui button primary'} onClick={this.onUpdate} >
                        update
                    </button>

                </div>

                <MemoSpeakPlayer />

            </div>
        )
    }

}

let changeUrl = (url) => {
    return (dispatch, getState) => {
        dispatch(actions.addToQueue([url]))
        dispatch(playerActions.play(url));
    }
}

const mapStateToProps = (state) => {
   return {

   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       changeUrl: function(url){
           return dispatch(changeUrl(url))
       }
   }
}

MemoSpeakPlayerTestPanel = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakPlayerTestPanel)

export default MemoSpeakPlayerTestPanel