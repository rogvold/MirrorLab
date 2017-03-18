/**
 * Created by sabir on 03.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import MathHelper from '../../../helpers/MathHelper'

import {LineChart, AreaChart, Line, ResponsiveContainer, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ReferenceLine} from 'recharts';

import InputRange from 'react-input-range';

const dateFormat = (time) => {
    // return time;
    var sec = Math.floor(time / 10.0) / 100.0
    var s = '' + sec;
    return s;
};

const tickFormatter = (time) => {
    // return time;
    var sec = Math.floor(time / 10.0) / 100.0
    var s = '' + sec;
    return s;
}

class ChartPanel extends React.Component {

    static defaultProps = {
        isAnimationActive: false,
        width: 600,
        height: 200,

        sessionId: undefined,
        // downsamplingNumber: 1000,

        marker1Position: undefined,
        marker2Position: undefined,
        markersLineNumber: undefined,

        // downsamplingNumber: 500,
        downsamplingNumber: 500,

        plotData: [],

        onClick: (lineNumber, index) => {
            console.log('onClick: lineNumber, index = ', lineNumber, index);
        }

    }

    static propTypes = {
        plotData: PropTypes.array
    }

    state = {
        range: {
            min: 0,
            max: 0
        }
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        let {plotData} = props;
        // this.state.endIndex = plotData.length - 1;
        this.state = {range: {max: plotData.length - 1, min: 0}, startIndex: 0, endIndex: plotData.length - 1};
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let {plotData, sessionId} = nextProps;
        if (sessionId != this.props.sessionId){
            this.setState({
                range: {max: plotData.length - 1, min: 0} ,startIndex: 0, endIndex: plotData.length - 1
            });
            return;
        }
        let prevPlotData = this.props.plotData;
        if (prevPlotData != undefined && plotData != undefined && plotData.length != prevPlotData.length){
            this.setState({
                range: {max: plotData.length - 1, min: 0}, startIndex: 0, endIndex: plotData.length - 1
            });
        }

    }

    onRangeChange = (d) => {
        let {startIndex, endIndex} = d;
        this.setState({
            startIndex: startIndex,
            endIndex: endIndex
        });
    }


    getDataForChannels = () => {
        console.log('getDataForChannels occured');

        let {min, max} = this.state.range;
        let {startIndex, endIndex} = this.state;
        let {plotData} = this.props;

        if (startIndex == undefined){
            startIndex = 0;
        }

        // console.log('plotData = ', plotData);

        // console.log('startIndex, endIndex = ', startIndex, endIndex);

        let filteredPlotData = plotData.filter((a, k) => {
            if (k < startIndex || k > endIndex){
                return false;
            }
            return true;
        });

        // console.log('filteredPlotData: aflter filtration : filteredPlotData = ', filteredPlotData);

        let freq = 500.0;
        let dt = 1000.0 / freq;

        let arr = MathHelper.makePointsDownsampling(filteredPlotData.map((p, k) => {
            return {
                t: p.t,
                value: p.channel1
            }
        }), this.props.downsamplingNumber);

        let arr2 = MathHelper.makePointsDownsampling(filteredPlotData.map((p, k) => {
            return {
                t: p.t,
                value: p.channel2
            }
        }), this.props.downsamplingNumber);

        // console.log('channel points right after downsampling: arr, arr2 = ', arr, arr2);

        arr = arr.map((p, k) => {
            return {
                t: p.t,
                ts: p.t + '',
                channel1: p.value,
                channel2: arr2[k].value
            }
        });



        return arr;
    }

    formatSliderLabel = (value) => {
        console.log('formatSliderLabel: value = ', value);
        let {plotData} = this.props;
        if (plotData == undefined || plotData.length == 0){
            return '';
        }
        if (value > plotData.length - 1){
            return '';
        }
        let d = plotData[value];
        if (d == undefined){
            return '0';
        }
        let t = d.t;
        console.log('formatSliderLabel: t = ' + t);
        return dateFormat(t);
    }

    onLineClick = (lineNumber, data) => {
        console.log('onLineClick: lineNumber, a, b, c = ', lineNumber, data);
        let t = data.activePayload[0].payload.t;
        this.props.onClick(lineNumber, t);
    }

    getMarkersRealPosition = (filteredPlotData) => {
        let {width, height, markersLineNumber, marker1Position, marker2Position} = this.props;
        let arr1 = filteredPlotData.filter((p) => {
            return (+p.t >= marker1Position)
        })
        let arr2 = filteredPlotData.filter((p) => {
            return (+p.t >= marker2Position)
        })
        let res = {};
        if (arr1.length > 0){
            res.marker1Position = arr1[0].t;
        }
        if (arr2.length > 0){
            res.marker2Position = arr2[0].t;
        }
        return res;
    }

    getScaleVerticalPoints = () => {
        // let N = 25;
        let N = 25;
        let {plotData} = this.props;
        if (plotData == undefined || plotData.length == 0){
            return [];
        }
        let maxT = plotData[plotData.length - 1].t;
        // let dt = 1000.0 / N;
        // let dt = 1000.0 / N;
        let dt = 1000.0 / N;
        let t = 0;
        let arr = [];
        while (t < maxT){
            arr.push(t);
            t = t + dt;
        }
        arr = arr.map((a) => {return a / 1000.0})
        return arr;
    }


    render() {
        let {plotData} = this.props;
        if (plotData == undefined){
            plotData = [];
        }

        let maxSlider = plotData.length -1;

        let {width, height, markersLineNumber, marker1Position, marker2Position} = this.props;

        let {range} = this.state;

        let filteredPlotData = this.getDataForChannels();

        let rmp = this.getMarkersRealPosition(filteredPlotData);

        // console.log('filtered plot data = ', filteredPlotData);

        let verticalPoints = this.getScaleVerticalPoints();

        console.log('verticalPoints = ', verticalPoints);

        return (
            <div className={'chart_placeholder'} >

                <LineChart width={width} height={height} data={filteredPlotData} syncId={'ecgId'}
                           margin={{ top: 20, right: 0, bottom: 0, left: 0 }} onClick={this.onLineClick.bind(this, 1)} >

                    <Line type="monotone" dot={false}
                          connectNulls={false}
                          isAnimationActive={this.props.isAnimationActive}
                          dataKey="channel1" strokeWidth={2} stroke="black" />

                    <XAxis dataKey="t"  tickFormatter={dateFormat} tickCount={5} minTickGap={10}  />

                    <CartesianGrid
                        fill={'#F9F6F7'}
                        stroke={'#B57C71'}
                        width={1}
                        vertical={true} />

                    <Tooltip labelFormatter={dateFormat} />

                    <YAxis scale={'auto'} />

                    {rmp.marker1Position != undefined ?
                        <ReferenceLine x={rmp.marker1Position} label={'M1'} stroke={'red'} /> : null
                    }

                    {rmp.marker2Position != undefined ?
                        <ReferenceLine x={rmp.marker2Position} label={'M2'} stroke={'blue'} /> : null
                    }

                </LineChart>

                <LineChart width={width} height={height} data={filteredPlotData}  syncId={'ecgId'}
                           onClick={this.onLineClick.bind(this, 2)}
                           margin={{ top: 0, right: 0, bottom: 0, left: 0 }} >

                    <Line type="monotone" dot={false}
                          connectNulls={false}
                          isAnimationActive={this.props.isAnimationActive}
                          dataKey="channel2" strokeWidth={2} stroke="black" />

                    <XAxis dataKey="t"  tickFormatter={dateFormat} tickCount={5} minTickGap={10}  />

                    <CartesianGrid
                        fill={'#F9F6F7'}
                        stroke={'#B57C71'}
                        vertical={true} />

                    <Tooltip labelFormatter={dateFormat} />

                    <YAxis scale={'auto'} />

                    {rmp.marker1Position != undefined ?
                        <ReferenceLine x={rmp.marker1Position} label={''} stroke={'red'} /> : null
                    }

                    {rmp.marker2Position != undefined ?
                        <ReferenceLine x={rmp.marker2Position} label={''} stroke={'blue'} /> : null
                    }

                </LineChart>

                <div className={'range_slider_placeholder'} >
                    <InputRange
                        formatLabel={this.formatSliderLabel}
                        maxValue={maxSlider}
                        minValue={0}
                        value={range}
                        onChange={(r) => {this.setState({range: r})}}
                        onChangeComplete={(r) => {this.setState({range: r, startIndex: r.min, endIndex: r.max})}} />
                </div>

            </div>
        )
    }
}


export default ChartPanel