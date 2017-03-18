/**
 * Created by sabir on 09.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SessionsList from '../list/SessionsList'

import CalendarPanel from '../../calendar/CalendarPanel'

import moment from 'moment';

class SessionsCalendarPanel extends React.Component {

    static defaultProps = {
        sessions: [],
        onSessionClick: (session) => {

        }
    }

    static propTypes = {}

    state = {
        selectedTimestamp: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getSessionsForDay = (timestamp) => {
        let start = +moment(timestamp).startOf('day');
        let end = +moment(timestamp).endOf('day');
        let {sessions} = this.props;
        let arr = sessions.filter((s) => {return (s.startTimestamp < end && s.startTimestamp > start)})
        return arr;
    }

    getSelectedContent = (timestamp) => {
        let sessions = this.getSessionsForDay(timestamp);
        return (
            <div className={'calendar_sessions_panel'} >
                <SessionsList sessions={sessions} onSessionClick={this.props.onSessionClick} />
            </div>
        )
    }

    contentFunction = (timestamp) => {
        let sessions = this.getSessionsForDay(timestamp);
        if (sessions.length == 0){
            return null;
        }
        return (
            <div className={'calendar_spot'} >
                <div className={'calendar_inner'} >
                    {sessions.length}
                </div>
            </div>
        );
    }

    onDaySelect = (t) => {
        let {selectedTimestamp} = this.state;
        if (this.getSessionsForDay(t).length == 0){
            return;
        }
        if (t == selectedTimestamp){
            t = undefined;
        }
        this.setState({
            selectedTimestamp: t
        });
    }

    render = () => {
        let {selectedTimestamp} = this.state;

        return (
            <div className={'sessions_calendar_panel'} >

                <CalendarPanel
                    selectedTimestamp={selectedTimestamp}
                    onDayClick={this.onDaySelect}
                    selectedContentFunction={this.getSelectedContent}
                    contentFunction={this.contentFunction}
                />

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

//SessionsCalendarPanel = connect(mapStateToProps, mapDispatchToProps)(SessionsCalendarPanel)

export default SessionsCalendarPanel