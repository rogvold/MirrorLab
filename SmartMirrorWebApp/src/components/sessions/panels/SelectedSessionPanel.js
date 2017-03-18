/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/ECGViewerActions'

import * as constants from '../../../constants/AccountsConstants'

import SessionsListPanel from './SessionsListPanel'

import UserNotesPanel from '../../notes/panels/UserNotesPanel'

import SessionChartPanel from '../charts/SessionChartPanel'

import CoolPreloader from '../../preloader/CoolPreloader'

import moment from 'moment';

class SelectedSessionPanel extends React.Component {

    static defaultProps = {}

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

    render = () => {
        let {session, user, loading} = this.props;

        console.log('SelectedSessionPanel: render: session, user =  ', session, user);

        if (session == undefined || user == undefined){
            return <div style={{display: 'none'}} ></div>;
        }

        let avatar = (user.avatar == undefined) ? constants.PATIENT_FACELESS_AVATAR : user.avatar;


        return (
            <div className={'selected_session_panel'} >

                <div className={'selected_session_panel_inner'} >

                    <div className={'header_placeholder'}>

                        <div className={'header'} >

                            <div className={'user_info_placeholder'} >
                                <div className={'avatar_placeholder'} >
                                    <img src={avatar} className={'avatar'} />
                                </div>
                                <div className={'username_placeholder'} >
                                    {user.firstName} {user.lastName}
                                </div>
                            </div>

                            <div className={'session_name_placeholder'} >
                                {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                            </div>

                            <div className={'close_placeholder'} >
                                <div className={'close_text'} onClick={() => {setTimeout(() => {this.props.close()}, 10)}} >
                                    <i className={'icon remove'} ></i> закрыть
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={'content_placeholder'} >

                        <div className={'left_placeholder'} >
                            <SessionsListPanel userId={user.id} />
                        </div>

                        <div className={'middle_placeholder'} >

                            <SessionChartPanel sessionId={session.id} />

                        </div>

                        <div className={'right_placeholder'} >
                            <UserNotesPanel userId={user.id} />
                        </div>

                        {loading == false ? null :
                            <CoolPreloader />
                        }

                    </div>

                </div>

            </div>
        )
    }

}

let getUser = (state) => {
    let {sessionsMap} = state.sessions;
    let {sessionId} = state.ecg;
    if (sessionId == undefined){
        return undefined;
    }
    let session = sessionsMap[sessionId];
    if (session == undefined){
        return null;
    }
    let {userId} = session;
    let user = state.users.usersMap.get(userId);
    return user;
}

let getSession = (state) => {
    let {sessionId} = state.ecg;
    if (sessionId == undefined){
        return undefined;
    }
    return state.sessions.sessionsMap[sessionId];
}


const mapStateToProps = (state) => {
   return {
       session: getSession(state),
       user: getUser(state),
       loading: state.sessions.loading || state.notes.loading || state.users.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       close: () => {
           return dispatch(actions.unselectSession())
       }
   }
}

SelectedSessionPanel = connect(mapStateToProps, mapDispatchToProps)(SelectedSessionPanel)

export default SelectedSessionPanel