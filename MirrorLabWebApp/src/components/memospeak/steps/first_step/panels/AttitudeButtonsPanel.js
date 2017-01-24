/**
 * Created by sabir on 12.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../../actions/StepsActions'

class AttitudeButtonsPanel extends React.Component {

    static defaultProps = {
        onUpdated: () => {

        }
    }

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

    onLike = () => {
        let {changeAttitude, getAttitude, getMaterialById, id, onUpdated} = this.props;
        let attitude = getAttitude(id);
        let material = getMaterialById(id);
        if (attitude == true || material == undefined){
            return;
        }
        changeAttitude(material.url, true).then(() => {
            onUpdated();
        });
    }

    onCancel = () => {
        let {changeAttitude, getAttitude, getMaterialById, id, onUpdated} = this.props;
        let attitude = getAttitude(id);
        let material = getMaterialById(id);
        if (attitude == false || material == undefined){
            return;
        }
        changeAttitude(material.url, false).then( () => {
            onUpdated();
        });
    }

    render = () => {
        let {changeAttitude, getAttitude, getMaterialById, id} = this.props;
        let attitude = getAttitude(id);

        return (
            <div className={'ui fluid buttons'}>
                <button className={'ui inverted red labeled icon button ' + ( (attitude == false) ? 'active' : '')} onClick={this.onCancel} >
                    <i className={'icon thumbs outline down'}></i>
                    Не нравится
                </button>
                <button className={'ui inverted green right labeled icon button ' + ( (attitude == true) ? 'active' : '' )} onClick={this.onLike} >
                    Нравится
                    <i className={'icon thumbs outline up'}></i>
                </button>
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
       getAttitude: (id) => {
           return getMaterialAttitude(state, id)
       },
       getMaterialById: (id) => {
           return getMaterialById_(state, id)
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       changeAttitude: (url, attitude) => {
            return dispatch(actions.saveAttitude(url, attitude))
       }
   }
}

AttitudeButtonsPanel = connect(mapStateToProps, mapDispatchToProps)(AttitudeButtonsPanel)

export default AttitudeButtonsPanel