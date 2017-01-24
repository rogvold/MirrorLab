/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MemoSpeakItem from './MemoSpeakItem'

class MemoSpeakList extends React.Component {

    static defaultProps = {
        materials: [],
        selectedId: undefined,

        onMaterialClick: (m) => {
            console.log('onMaterialClick: default: m = ', m);
        }
    }

    static propTypes = {

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

    onMaterialClick = (m) => {
        console.log('MemoSpeakList: onMaterialClick: m = ', m);
        this.props.onMaterialClick(m);
    }


    render = () => {
        let {materials, selectedId} = this.props;

        return (
            <div className={'memospeak_list'} >

                {materials.map( (item, k) => {
                    let key = 'key_' + k;
                    let selected = (selectedId == item.id);
                    let onClick = this.onMaterialClick.bind(this, item);

                    return (
                        <MemoSpeakItem key={key} selected={selected} id={item.id} onClick={onClick} />
                    )
                })}

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

//MemoSpeakList = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakList)

export default MemoSpeakList