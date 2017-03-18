/**
 * Created by sabir on 03.12.16.
 */


import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';
import * as viewerActions from '../../../actions/ECGViewerActions.js';

import moment from 'moment';

import MathHelper from '../../../helpers/MathHelper.js';

import ChartPanel from './ChartPanel.js';

import Measure from 'react-measure';

import CoolPreloader from '../../preloader/CoolPreloader'

class SessionChartPanel extends React.Component {

    static defaultProps = {
        freq: 500
    }

    static propTypes = {
        sessionId: PropTypes.string.isRequired,
        sessionsMap: PropTypes.object.isRequired,
        sessionsDataMap: PropTypes.object.isRequired
    }

    state = {
        dimensions: {
            width: -1,
            height: -1
        }
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSessionData(this.props.sessionId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sessionId != this.props.sessionId){
            this.props.loadSessionData(nextProps.sessionId );
        }
    }

    getPlotData = () => {

        var session = this.props.sessionsMap[this.props.sessionId];
        var d = this.props.sessionsDataMap[this.props.sessionId];
        if (d == undefined || session == undefined){
            return [];
        }

        let {freq} = this.props;
        let dt = 1000.0 / freq;

        let arr = d.channel1Points.map((p, k) => {
            return {
                t: dt * k,
                ts: (dt * k) + '',
                channel1: p,
                channel2: d.channel2Points[k]
            }
        })

        return arr;
    }

    onLineClick = (lineNumber, time) => {
        console.log('--- >>>   onLineClick: index = ', time);
        let markerNumber = 1;
        if (this.props.marker1Position != undefined){
            markerNumber = 2;
        }
        if (this.props.marker2Position != undefined){
            this.props.unsetAllMarkers(lineNumber);
        }else {
            this.props.selectMarker(lineNumber, markerNumber, time);
        }
    }

    getMarkerValuesByPlotData = (plotData) => {
        let {marker1Position, marker2Position} = this.props;
        let res = {marker1: {channel1: undefined, channel2: undefined}, marker2: {channel1: undefined, channel2: undefined}};
        if (marker1Position == undefined && marker2Position == undefined){
            return res;
        }

        // console.log('getMarkerValuesByPlotData: marker1Position, marker2Position = ', marker1Position, marker2Position);

        if (marker1Position != undefined){
            let point1Arr = plotData.filter((p) => {return (+p.t >= +marker1Position)});
            // console.log('point1Arr = ', point1Arr);
            if (point1Arr.length > 0){
                // console.log('point1 = ', point1Arr[0]);
                res.marker1.channel1 = point1Arr[0].channel1;
                res.marker1.channel2 = point1Arr[0].channel2;
                res.marker1.t = +point1Arr[0].t;
            }
        }
        if (marker2Position != undefined){
            let point2Arr = plotData.filter((p) => {return (+p.t >= +marker2Position)});
            // console.log('point2Arr = ', point2Arr);
            if (point2Arr.length > 0){
                // console.log('point2 = ', point2Arr[0]);
                res.marker2.channel1 = point2Arr[0].channel1;
                res.marker2.channel2 = point2Arr[0].channel2;
                res.marker2.t = +point2Arr[0].t;
            }
        }

        if (res.marker1.t != undefined && res.marker2.t != undefined){
            res.delta1 = Math.abs(res.marker1.channel1 - res.marker2.channel1);
            res.delta2 = Math.abs(res.marker1.channel2 - res.marker2.channel2);
            res.deltaT = Math.abs(res.marker1.t - res.marker2.t);
        }

        return res;
    }

    render() {
        var session = this.props.sessionsMap[this.props.sessionId];
        let plotData = this.getPlotData();
        let {width, height} = this.state.dimensions;
        let {loading, markersLineNumber, marker1Position, marker2Position, sessionId} = this.props;
        let markersData = this.getMarkerValuesByPlotData(plotData);

        // console.log('SessionChartPanel: markersData = ', markersData);

        return (
            <div className={'session_chart_panel'} >

                <Measure
                    onMeasure={(dimensions) => {
                        this.setState({dimensions})
                    }} >

                    <ChartPanel plotData={plotData} width={width} onClick={this.onLineClick}
                                marker1Position={marker1Position}
                                marker2Position={marker2Position}
                                markersLineNumber={markersLineNumber}
                                sessionId={sessionId}
                    />

                </Measure>


                <div className={'controls_placeholder'} >
                    <div className={'markers_placeholder'} >
                        <div className={'marker_placeholder'} >
                            <div className={'row'} >
                                <div className={'left'} >
                                    Маркер 1
                                </div>
                                <div className={'right'} >
                                    {marker1Position == undefined ? 'не выбран' : ((Math.floor(+markersData.marker1.t) / 1000.0) + ' c' )}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 1
                                </div>
                                <div className={'right'} >
                                    {markersData.marker1.channel1}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 2
                                </div>
                                <div className={'right'} >
                                    {markersData.marker1.channel2}
                                </div>
                            </div>
                        </div>
                        <div className={'marker_placeholder'} >
                            <div className={'row'} >
                                <div className={'left'} >
                                    Маркер 2
                                </div>
                                <div className={'right'} >
                                    {marker2Position == undefined ? 'не выбран' : ((Math.floor(+markersData.marker2.t) / 1000.0) + ' c' )}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 1
                                </div>
                                <div className={'right'} >
                                    {markersData.marker2.channel1}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 2
                                </div>
                                <div className={'right'} >
                                    {markersData.marker2.channel2}
                                </div>
                            </div>
                        </div>
                        <div className={'marker_placeholder'} >
                            <div className={'row'} >
                                <div className={'left'} >
                                    Разница
                                </div>
                                <div className={'right'} >
                                    {markersData.deltaT == undefined ? '-' : ((Math.floor(+markersData.deltaT) / 1000.0) + ' c' )}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 1
                                </div>
                                <div className={'right'} >
                                    {markersData.delta1 == undefined ? '-' : markersData.delta1}
                                </div>
                            </div>
                            <div className={'row'} >
                                <div className={'left'} >
                                    Канал 2
                                </div>
                                <div className={'right'} >
                                    {markersData.delta2 == undefined ? '-' : markersData.delta2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        sessionsMap: state.sessions.sessionsMap,
        sessionsDataMap: state.sessions.sessionsDataMap,
        loading: state.sessions.loading,
        error: state.sessions.error,
        markersLineNumber: state.ecg.lineNumber,
        marker1Position: state.ecg.marker1Position,
        marker2Position: state.ecg.marker2Position
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessionData: (sessionId) => {
            return dispatch(actions.loadSessionData(sessionId))
        },

        selectMarker: (lineNumber, markerNumber, index) => {
            return dispatch(viewerActions.setMarker(lineNumber, markerNumber, index));
        },

        unsetAllMarkers: (lineNumber) => {
            return dispatch(viewerActions.unsetAllMarkers(lineNumber));
        }

    }
}

SessionChartPanel = connect(mapStateToProps, mapDispatchToProps)(SessionChartPanel)

export default SessionChartPanel