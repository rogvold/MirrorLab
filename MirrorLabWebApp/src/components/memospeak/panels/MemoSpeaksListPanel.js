/**
 * Created by sabir on 11.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Scroll from 'react-scroll';
let scroller = Scroll.scroller;
let scroll = Scroll.animateScroll;

import MemoSpeakBunchedList from '../list/MemoSpeakBunchedList'

import MemospeakPanel from '../steps/first_step/panels/MemospeakPanel'

import scrollIntoView from 'scroll-into-view';

class MemoSpeaksListPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        selectedId: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onMaterialClick = (m) => {
        this.scrollToPanel();
        this.setState({
            selectedId: m.id
        });
    }

    getSelectedIndex = () => {
        let {selectedId} = this.state;
        let arr = this.props.materials;
        let index = undefined;
        for (let i in arr){
            if (arr[i].id == selectedId){
                index = i;
            }
        }
        return index;
    }

    onPrev = () => {
        let {materials} = this.props;
        let index = this.getSelectedIndex();
        if (index == undefined){
            return;
        }
        if (index > 0){
            index = index - 1;
        }
        this.scrollToPanel();
        this.setState({
            selectedId: materials[index].id
        });
    }

    onNext = () => {
        let {materials} = this.props;
        let index = this.getSelectedIndex();
        console.log('onNext: index = ', index);
        if (index == undefined){
            return;
        }
        if (index < materials.length - 1){
            index = +index + 1;
        }
        this.scrollToPanel();
        this.setState({
            selectedId: materials[index].id
        });

    }

    scrollToPanel = () => {
        console.log('scrollToPanel occured');
        setTimeout(function(){
            try{
                let el = document.getElementsByClassName('memospeak_panel')[0];
                scrollIntoView(el);
            }catch (err){
                console.log('err');
            }
        }, 100);
    }


    render = () => {
        let {materials} = this.props;
        let {selectedId} = this.state;

        return (
            <div className={'memo_speaks_list_panel'} >

                <MemoSpeakBunchedList
                    selectedId={selectedId}
                    materials={materials}
                    onMaterialClick={this.onMaterialClick}

                    getSelectedMaterialContent={ (id) => {
                            return ( <MemospeakPanel
                                            onNext={this.onNext}
                                            onPrev={this.onPrev}
                                            id={id}  />
                            )
                        }
                    } />

            </div>
        )
    }

}

let getMemoSpeaksList = (state) => {
    let map = state.memospeak.memospeaksMap;
    let arr = [];
    for (var key in map){
        let mem = map[key];
        arr.push(mem);
    }
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp);
    });
    console.log('getMemoSpeaksList: arr = ', arr);
    return arr;
}

const mapStateToProps = (state) => {
   return {
        materials: getMemoSpeaksList(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

MemoSpeaksListPanel = connect(mapStateToProps, mapDispatchToProps)(MemoSpeaksListPanel)

export default MemoSpeaksListPanel