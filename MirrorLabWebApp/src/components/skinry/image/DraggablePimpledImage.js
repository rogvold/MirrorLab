/**
 * Created by sabir on 01.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Measure from 'react-measure';

import Draggable from 'react-draggable';

import Slider from 'react-rangeslider'

import ReactSlider from 'react-slider'

import ScrollEvent from 'react-onscroll';

class DraggablePimpledImage extends React.Component {

    static defaultProps = {

        selectedIndex: undefined,

        onPimpleClick: function(k){
            console.log('onPimpleClick: k = ', k);
        },

        onPointsChange: function(newPoints){

        }

    }

    static propTypes = {}

    state = {
        dimensions: {
            width: -1,
            height: -1
        },
        // points: this.props.points
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {

    }

    onPimpleClick = (k) => {
        this.props.onPimpleClick(k);
    }

    onStartDrag = (k, a, b, c, d) => {
        // console.log('onStartDrag: k, a, b, c, d = ', k, a, b, c, d);
    }

    onStopDrag = (k, a, b, c, d) => {
        console.log('onStopDrag: k, a, b, c, d = ', k, a, b, c, d);
        console.log('x, y = ', b.x, b.y);
        // let {points} = this.state;
        let {points} = this.props;
        let {width, height} = this.state.dimensions;

        let p = points[k];
        let r = (p.r == undefined) ? p.rx : p.r

        let rx = (+r); //in
        let ry = rx * width / height ; //in

        console.log('rx, ry = ', rx, ry);

        var x_perc = b.x * 1.0 / width;
        var y_perc = b.y * 1.0 / height;

        console.log('x_perc, y_perc = ', x_perc, y_perc);

        points[k].x = (x_perc + (rx / 2.0));
        points[k].y = (y_perc + (ry / 2.0));
        points[k].rx = rx;
        points[k].ry = ry;



        // this.setState({
        //     points: points
        // });

        this.props.onPointsChange(points);

    }

    onDrag = (k, a, b, c, d) => {
        // console.log('onDrag: k, a, b, c, d = ', k, a, b, c, d);

    }

    onRadChange = (v) => {
        let k = this.props.selectedIndex;
        console.log('onRadChange: v = ', v);
        let {width, height} = this.state.dimensions;

        // console.log('v.target.value = ', v.target.value);

        let {points} = this.props;

        points[k].r = v / 1000.0;

        points[k].rx = points[k].r;
        points[k].ry = points[k].rx * width / height;

        console.log('setting points = ', points);



        // this.setState({
        //     points: points
        // });

        this.props.onPointsChange(points);

        // setTimeout(function(){
        //     let {points} = this.state;
        //     points[k].r = v / 1000.0;
        //     console.log('setting points = ', points);
        //     this.setState({
        //         points: points
        //     });
        // }.bind(this), 1000)

    }

    getPoints = () => {
        let {selectedIndex} = this.props;
        let {points} = this.props;

        let {width, height} = this.state.dimensions;

        if (width == -1){
            return null;
        }

        if (points == undefined){
            points = [];
        }

        console.log('getPoints: width, height = ', width, height);

        return points.map((p, k) => {
            let key = 'pimple_' + k;
            let r = p.r;
            if (r == undefined){
                r = p.rx;
            }
            let rx = (+r) * 100;
            let ry = rx * width / height ;
            // let ry = (+p.ry) * 100;
            let x = (+p.x * 100 - (rx / 2.0));
            let y = (+p.y * 100 - (ry / 2.0));
            // let st = Object.assign({}, {left: x + '%', top: y + '%', width: rx + '%', height: ry + '%'});
            let st = Object.assign({}, {width: rx + '%', height: ry + '%'});
            let isSelected = (selectedIndex == k);
            let onClick = this.onPimpleClick.bind(this, k);

            let onStartDrag = this.onStartDrag.bind(this, k);
            let onStopDrag = this.onStopDrag.bind(this, k);
            let onDrag = this.onDrag.bind(this, k);
            let onRadChange = this.onRadChange.bind(this, k);
            return (
                <Draggable key={key}
                            onStart={onStartDrag}
                            onStop={onStopDrag}
                            onDrag={onDrag}
                            position={
                                {
                                    x: x * width / 100.0,
                                    y: y * height / 100.0
                                }
                            }
                >
                    <div className={'pimple  ' + (isSelected == true ? 'selected' : '')} style={st} onClick={onClick} >

                        <div className={'inner_pimple'} >
                            <div className={'pimple_info_placeholder'} >
                                x = {Math.floor(x * 100.0) / 100.0}% , y = {Math.floor(y * 100.0) / 100.0}%
                            </div>
                        </div>

                    </div>
                </Draggable>
            );
        })
    }

    getSliderStyle = () => {
        let {selectedIndex} = this.props;
        let {points} = this.props;
        let {width, height} = this.state.dimensions;

        if (selectedIndex == undefined || selectedIndex > points.length || selectedIndex < 0){
            return {
                display: 'none'
            }
        }

        let p = points[selectedIndex];

        return {
            left: p.x * width,
            top: p.y * height + 60,
        }

    }

    getSliderValue = () => {
        let {selectedIndex} = this.props;
        let {points} = this.props;
        let {width, height} = this.state.dimensions;

        if (selectedIndex == undefined || selectedIndex > points.length || selectedIndex < 0) {
            return 1;
        }
        let p = points[selectedIndex]
        let r = (p.r == undefined) ? p.rx : p.r;
        return (+r) * 1000;
    }

    // onWheel(a, b, c) {
    //     console.log('onWheel: a, b, c = ', a, b, c);
    //     console.log('a.target = ', a.target);
    // }



    render = () => {
        let {src} = this.props;
        let {width, height} = this.state.dimensions;
        let sliderStyle = this.getSliderStyle();
        let sliderVal = this.getSliderValue();

        console.log('sliderVal = ', sliderVal);

        return (
            <div className={'pimpled_image'} >

                <Measure
                    onMeasure={(dimensions) => {
                        this.setState({dimensions})
                    }}
                >

                    <div style={{width: '100%', height: 'auto', position: 'relative'}}>

                        <img src={src} />

                        <div className={'pimples_placeholder'} >
                            <div className={'pimples'} >
                                {this.getPoints()}
                            </div>
                        </div>

                        <div className={'pimple_editor_controls'} style={sliderStyle} >
                            <ReactSlider
                                min={1}
                                max={100}
                                value={sliderVal}
                                onChange={this.onRadChange}
                            />



                        </div>
                    </div>

                </Measure>

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

//DraggablePimpledImage = connect(mapStateToProps, mapDispatchToProps)(DraggablePimpledImage)

export default DraggablePimpledImage