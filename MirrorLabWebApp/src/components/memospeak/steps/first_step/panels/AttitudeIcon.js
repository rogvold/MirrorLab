/**
 * Created by sabir on 12.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../../actions/StepsActions'

class AttitudeIcon extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired
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

    render = () => {
        let {changeAttitude, getAttitude, getMaterialById, id} = this.props;
        let attitude = getAttitude(id);
        if (attitude == undefined){
            return null;
        }

        return (
            <div className={'attitude_icon_placeholder'} >
                {attitude == true ?
                    <i className={'icon checkmark'} ></i> :
                    null
                }
                {attitude == false ?
                    <i className={'icon remove'} ></i> :
                    null
                }
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

    }
}

AttitudeIcon = connect(mapStateToProps, mapDispatchToProps)(AttitudeIcon)

export default AttitudeIcon