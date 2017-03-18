/**
 * Created by sabir on 24.01.2017.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';

import SessionsList from '../list/SessionsList.js'

import CoolPreloader from '../../preloader/CoolPreloader.js'

import Dialog from '../../dialog/Dialog.js';

import SessionChartPanel from '../charts/SessionChartPanel.js';

import NoSessionsPanel from '../../placeholder/NoSessionsPanel'

import * as viewerActions from '../../../actions/ECGViewerActions'

class SessionsListPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        userId: PropTypes.string.isRequired,
        usersMap: PropTypes.object.isRequired,
        sessionsMap: PropTypes.object.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUserSessions(this.props.userId);
    }

    componentWillReceiveProps() {

    }

    getSessions = () => {
        var userId = this.props.userId;
        var map = this.props.sessionsMap;
        var arr = [];
        for (var key in map){
            var session = map[key];
            if (session == undefined){
                continue;
            }
            if (session.userId == userId){
                arr.push(session);
            }
        }
        arr.sort(function(a, b){
            return (b.startTimestamp - a.startTimestamp)
        });
        return arr;
    }

    onItemClick = (item) => {
        // this.setState({
        //     selectedSession: item
        // });
        return this.props.selectSession(item.id);
    }

    render() {
        var user = this.props.usersMap.get(this.props.userId);
        var sessions = this.getSessions();
        // var selectedSessionId = (this.state.selectedSession == undefined) ? undefined : this.state.selectedSession.id;
        let {loading} = this.props;
        let selectedSessionId = this.props.selectedId;

        return (
            <div className={'sessions_list_panel'} >

                <div className={'list_placeholder'} >
                    <SessionsList selectedSessionId={selectedSessionId}
                                  sessions={sessions} onItemClick={this.onItemClick} />
                </div>

                {loading == false && sessions.length == 0 ?
                    <NoSessionsPanel /> : null
                }

                {loading == false ? null :
                    <div className={'mini_loading'} >
                        загрузка...
                    </div>
                }



            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        usersMap: state.users.usersMap,
        sessionsMap: state.sessions.sessionsMap,
        loading: state.sessions.loading,
        selectedId: state.ecg.sessionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserSessions: (userId) => {
            dispatch(actions.loadUserSessions(userId))
        },
        loadSessionData: (sessionId) => {
            dispatch(actions.loadSessionData(sessionId))
        },
        selectSession: (sessionId) => {
            return dispatch(viewerActions.selectSession(sessionId))
        }
    }
}

SessionsListPanel = connect(mapStateToProps, mapDispatchToProps)(SessionsListPanel)

export default SessionsListPanel