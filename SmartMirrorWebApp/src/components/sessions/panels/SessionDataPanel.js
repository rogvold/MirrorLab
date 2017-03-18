/**
 * Created by sabir on 02.02.17.
 */
/**
 * Created by sabir on 24.01.2017.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';

import moment from 'moment';

import CoolPreloader from '../../preloader/CoolPreloader.js'

import MathHelper from '../../../helpers/MathHelper.js';

import ChartPanel from '../charts/ChartPanel.js';

import SessionChartPanel from '../charts/SessionChartPanel'

class SessionDataPanel extends React.Component {

    static defaultProps = {
        downsamplingNumber: 200
    }

    static propTypes = {
        sessionId: PropTypes.string.isRequired,
        sessionsMap: PropTypes.object.isRequired,
        sessionsDataMap: PropTypes.object.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSessionData(this.props.sessionId);
    }

    componentWillReceiveProps() {

    }

    getData = () => {
        let {sessionsDataMap, sessionId} = this.props;
        let data = sessionsDataMap[sessionId];
        return data;
    }

    render() {
        var session = this.props.sessionsMap[this.props.sessionId];
        let data = this.getData();
        let {sessionId} = this.props;

        return (
            <div className={'session_data_panel'} >

                {data == undefined ? null :
                    <div className={'content'} >
                        <div className={'ui form'} >
                            <div className={'field'} >
                                <label>
                                    Канал 1
                                </label>
                                <textarea value={data.channel1Points.join(', ')}></textarea>
                            </div>
                            <div className={'field'} >
                                <label>
                                    Канал 2
                                </label>
                                <textarea value={data.channel2Points.join(', ')}></textarea>
                            </div>

                            <div className={'field'} >
                                <SessionChartPanel sessionId={sessionId} />
                            </div>


                        </div>

                    </div>
                }

                {this.props.loading == false ? null :
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
        error: state.sessions.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessionData: (sessionId) => {
            dispatch(actions.loadSessionData(sessionId))
        }
    }
}

SessionDataPanel = connect(mapStateToProps, mapDispatchToProps)(SessionDataPanel)

export default SessionDataPanel