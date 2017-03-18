/**
 * Created by sabir on 08.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as usersActions from '../../../actions/UsersActions'
import * as sessionsActions from '../../../actions/SessionsActions'
import * as photosActions from '../../../actions/PhotosActions'
import * as notesActions from '../../../actions/NotesActions'
import * as viewActions from '../../../actions/ECGViewerActions'

import CoolPreloader from '../../preloader/CoolPreloader'

// import CalendarPanel from '../../calendar/CalendarPanel'

import SessionsCalendarPanel from '../calendar/SessionsCalendarPanel'

import SessionsList from '../list/SessionsList'

class DoctorDashboardPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadFriendsAndSessionsAndNotes, userId} = this.props;
        loadFriendsAndSessionsAndNotes(userId);
    }


    componentWillReceiveProps() {

    }

    onSessionClick = (sess) => {
        let {selectSession} = this.props;
        selectSession(sess.id);
    }

    render = () => {
        let {loading, users, notes, sessions} = this.props;
        let hasRight = (sessions.length > 0);

        return (
            <div className={'doctor_dashboard_panel '} >

                <div className={'top_block'} >

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/boy.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                {users.length}
                            </div>
                            <div className={'bottom'} >
                                ПАЦИЕНТЫ
                            </div>
                        </div>

                    </div>

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/cardiogram.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                { sessions.length}
                            </div>
                            <div className={'bottom'} >
                                КАРДИОГРАММЫ
                            </div>
                        </div>

                    </div>

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/notepad.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                {notes.length}
                            </div>
                            <div className={'bottom'} >
                                РАСШИФРОВКИ
                            </div>
                        </div>

                    </div>

                </div>


                <div className={'middle_block '  + (hasRight == true ? ' with_right ' : '') } >

                    <div className={'left_block'} >

                        <div className={'header_text'} >
                            Календарь записей
                        </div>

                        <SessionsCalendarPanel
                            onSessionClick={this.onSessionClick}
                            sessions={sessions} />

                    </div>

                    <div className={'right_block'} >

                        <div className={'header_text'} >
                            Последние записи
                        </div>

                        <SessionsList sessions={sessions} onSessionClick={this.onSessionClick} />

                    </div>

                </div>




                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let loadEverything = (userId) => {
    return (dispatch, getState) => {
        console.log('trying to dispatch loadUserUserLinks');
        dispatch(usersActions.loadUserUserLinks(userId)).then(
            (usersActionsData) => {
                console.log('usersActionsData = ', usersActionsData);
                return dispatch(photosActions.loadFriendsPhotos());
            }
        ).then(
            (photosActionsData) => {
                console.log('dispatched: photosActionsData = ', photosActionsData);
                return dispatch(notesActions.loadUserNotes(userId));
            }).catch(
                err => {console.log('err = ', err);}
        )
    }
}

let getAllData = (state) => {
    let {usersMap, currentUserId} = state.users;
    let users = usersMap.toList().toJS().filter((u) => {return (u.id != currentUserId)})
    let notes = state.notes.notesMap.toList().toJS();
    let {sessionsMap} = state.sessions;
    let sessions = [];
    for (var key in sessionsMap){
        sessions.push(sessionsMap[key]);
    }
    sessions.sort((a, b) => {
        return (b.startTimestamp - a.startTimestamp);
    })
    return {
        sessions: sessions,
        notes: notes,
        users: users
    }
}

const mapStateToProps = (state) => {
    let data = getAllData(state);
   return {
       loading: state.users.loading || state.sessions.loading || state.notes.loading,
       userId: state.users.currentUserId,
       users: data.users,
       sessions: data.sessions,
       notes: data.notes
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadFriendsAndSessionsAndNotes: (userId) => {
            return dispatch(loadEverything(userId));
       },
       selectSession: (sessionId) => {
           return dispatch(viewActions.selectSession(sessionId))
       }
   }
}

DoctorDashboardPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorDashboardPanel)

export default DoctorDashboardPanel