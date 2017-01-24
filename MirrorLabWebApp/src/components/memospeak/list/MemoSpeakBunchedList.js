/**
 * Created by sabir on 02.01.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// var Scroll = require('react-scroll');
// var Element = Scroll.Element;
// var scroller = Scroll.scroller;

import Scroll from 'react-scroll'
var scroller = Scroll.scroller

import MemoSpeakList from './MemoSpeakList'

import MemospeakPanel from '../steps/first_step/panels/MemospeakPanel'

class MemoSpeakBunchedList extends React.Component {

    static defaultProps = {
        materials: [],
        selectedId: undefined,
        columnsNumber: 4,

        onMaterialClick: (m) => {

        },

        getSelectedMaterialContent: (id) => {
            return (
                <MemospeakPanel id={id}  />
            )
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

    onMaterialClick = (m) => {
        console.log('MemoSpeakBunchedList: onMaterialClick: m = ', m);
        this.props.onMaterialClick(m);

    }


    getBunchesListComponent = () => {
        let {materials, columnsNumber, selectedId, getSelectedMaterialContent} = this.props;
        let bunches = [];
        let n = Math.ceil(materials.length / columnsNumber);
        for (let i = 0; i < n; i++){
            let from = i * columnsNumber;
            let to = (+i + 1) * columnsNumber;
            let arr = materials.slice(from, to);
            bunches.push({materials: arr});
        }
        return (
            <div className={'bunches_list'} >
                {bunches.map( (b, k) => {
                    let key = 'bunch_' + k;
                    let cont = false;
                    let mts = b.materials;
                    for (let i in mts){
                        if (mts[i].id == selectedId){
                            cont = true;
                        }
                    }
                    let onMaterialClick = this.onMaterialClick.bind(this);
                    return (
                        <div className={'bunch_item'} key={key} >
                            <div className={'bunch_materials_list_placeholder'} >
                                <MemoSpeakList selectedId={selectedId}
                                               onMaterialClick={onMaterialClick}
                                               materials={b.materials} />
                            </div>
                            {cont == false ? null :
                                <div className={'selected_material_content'} >
                                    {getSelectedMaterialContent(selectedId)}
                                </div>
                            }
                        </div>
                    );
                } )}
            </div>
        );
    }

    render = () => {

        return (
            <div className={'memo_speak_bunched_list'} >

                {this.getBunchesListComponent()}

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//MemoSpeakBunchedList = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakBunchedList)

export default MemoSpeakBunchedList