/**
 * Created by sabir on 01.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SkinryImage from '../image/SkinryImage'

import PimpledImage from '../../skinry/image/PimpledImage'
import DraggablePimpledImage from '../../skinry/image/DraggablePimpledImage'

class SkinryPimpleEditor extends React.Component {

    static defaultProps = {

        points: [],

        // src: 'http://images.huffingtonpost.com/2015-09-29-1443550569-5683781-trumppucker.jpg'
        src: 'https://mirrorlab.sabir.pro/uploads/hkybmtnjnwgmetnifpbnwpzbyvljhu.jpg'

    }

    static propTypes = {

    }

    state = {
        points: this.props.points,
        selectedPointIndex: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onCircleAdd = () => {
        let newPoint = {
            x: 0.5,
            y: 0.5,
            r: 0.1
            // rx: 0.01,
            // ry: 0.01
        }
        let {points} = this.state;
        if (points == undefined){
            points = [];
        }
        points.push(newPoint);
        this.setState({
            selectedPointIndex: points.length - 1,
            points: points
        });
    }

    onCircleRemove = () => {
        let {selectedPointIndex, points} = this.state;
        var arr = [];
        for (var i in points){
            if (i == selectedPointIndex){
                continue;
            }
            arr.push(points[i]);
        }
        this.setState({
            points: arr,
            selectedPointIndex: undefined
        });
    }

    onPimpleClick = (k) => {
        this.setState({
            selectedPointIndex: k
        });
    }

    onPointsChange = (newPoints) => {
        this.setState({
            points: newPoints
        });
    }

    onSave = () => {
        let {points} = this.state;
        let dPoints = points.map( (p) => {
            return {
                x: p.x,
                y: p.y,
                rx: p.rx,
                ry: p.ry,
            }
        })
        this.props.onSave(dPoints);
    }


    render = () => {
        let {points, selectedPointIndex} = this.state;
        let {src} = this.props;

        return (
            <div className={'skinry_pimple_editor'} >

                <div className={'left'} >
                    <DraggablePimpledImage
                        src={src}
                        onPointsChange={this.onPointsChange}
                        onPimpleClick={this.onPimpleClick}
                        points={points} selectedIndex={selectedPointIndex} />
                </div>

                <div className={'right'} >

                    <button className={'ui primary button fluid'} onClick={this.onCircleAdd} >
                        <i className={'icon plus'} ></i> Добавить круг
                    </button>

                    {(points == undefined || points.length == 0) ? null :
                        <button className={'ui red button fluid'} style={{marginTop: 5}} onClick={this.onCircleRemove} >
                            <i className={'icon remove'} ></i> Удалить круг
                        </button>
                    }

                    <div className={'circles_number_placeholder'} >
                        Количество кругов: <b>{points.length}</b>
                    </div>

                    <div className={'save_button_placeholder'} >
                        <button className={'ui primary button fluid'} onClick={this.onSave} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>

                </div>

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

//SkinryPimpleEditor = connect(mapStateToProps, mapDispatchToProps)(SkinryPimpleEditor)

export default SkinryPimpleEditor