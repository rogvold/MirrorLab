/**
 * Created by sabir on 12.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../../../../constants/UIConstants'

import Dialog from '../../../../dialog/Dialog'

import MemoSpeakSlidesPanel from '../../../slides/panels/MemoSpeakSlidesPanel'

import * as actions from '../../../../../actions/SlidesActions'

import MemoSpeakHelper from '../../../../../helpers/MemoSpeakHelper'

class SecondStepGroupsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        materials: PropTypes.array.isRequired,
        selectMaterials: PropTypes.func
    }

    state = {
        selectedGroupNumber: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onGroupClick = (n) => {
        console.log('onGroupClick: n = ', n);
        let {groups, selectMaterials} = this.props;
        if (n > groups.length - 1){
            return null;
        }
        let g = groups[n];
        selectMaterials(g.materials);
        this.setState({
            selectedGroupNumber: n
        });
    }

    getGroupsList = () => {
        let {groups, materials} = this.props;
        if (groups.length == 0){
            return (
                <div className={'no_groups_placeholder'} >
                    Вы не выбрали ни одного материала. Пожалуйста, вернитесь к <b>Шагу №1</b>
                </div>
            );
        }
        return groups.map((g, k) => {
            let key = 'group_' + k;
            let onClick = this.onGroupClick.bind(this, k)
            return (
                <div className={'group'} key={key} onClick={onClick} >
                    <div className={'name_placeholder'} >
                        <div className={'name'} >
                            Пачка №{+k + 1}
                        </div>
                    </div>
                </div>
            )
        })
    }

    getSelectedContent = () => {
        return (
            <MemoSpeakSlidesPanel  />
        )
    }


    render = () => {
        let {materials, groups} = this.props;
        let {selectedGroupNumber} = this.state;

        return (
            <div className={'second_step_groups_panel'} >

                <div className={'groups_list'} >
                    {this.getGroupsList()}
                </div>

                {selectedGroupNumber == undefined ? null :
                    <div className={'selected_group_content'} >
                        <div className={'content_placeholder'} >
                            {this.getSelectedContent()}
                        </div>
                        <div className={'close_button_placeholder'} onClick={() => {this.setState({selectedGroupNumber: undefined})}} >
                            <i className={'icon remove'} ></i>
                        </div>

                    </div>
                }

            </div>
        )
    }

}


let getAttitudeByUrl = (state, url) => {
    let {attitudeMap} = state.steps;
    if (url == undefined){
        return undefined;
    }
    return attitudeMap.get(url);
}

let getGroups = (state) => {
    let materials = getMaterials(state);
    let arr = [];
    let n = Math.floor(materials.length / constants.MATERIALS_GROUP_SIZE);
    if (materials.length == 0){
        return [];
    }
    for (let i= 0; i <= n; i++){
        let from = i * constants.MATERIALS_GROUP_SIZE;
        let to = +from + constants.MATERIALS_GROUP_SIZE;
        let mts = materials.slice(from, to);
        arr.push({
            materials: mts,
            number: i,
            size: mts.length
        });
    }
    return arr;
}

let getMaterials = (state) => {
    let {memospeaksMap} = state.memospeak;
    let arr = [];
    for (let key in memospeaksMap){
        let m = memospeaksMap[key];
        if (m == undefined){
            continue;
        }
        let url = m.url;
        let att = getAttitudeByUrl(state, url);
        if (att != true){
            continue;
        }
        arr.push(m);
    }
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp);
    })
    return arr;
}

const mapStateToProps = (state) => {
   return {
        materials: getMaterials(state),
        groups: getGroups(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        selectMaterials: (materials) => {
            return dispatch(actions.changeSlides(MemoSpeakHelper.getSlidesForSecondStep(materials, 300)))
        }
   }
}

SecondStepGroupsPanel = connect(mapStateToProps, mapDispatchToProps)(SecondStepGroupsPanel)

export default SecondStepGroupsPanel