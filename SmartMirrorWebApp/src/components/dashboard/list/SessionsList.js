/**
 * Created by sabir on 08.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../../constants/AccountsConstants'

import moment from 'moment';

class SessionsList extends React.Component {

    static defaultProps = {
        sessions: [],
        onSessionClick: (session) => {

        }
    }

    static propTypes = {
        onSessionClick: (sess) => {
            console.log('onSessionClick: sess = ', sess);
        }
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

    onSessionClick = (session) => {
        this.props.onSessionClick(session);
    }

    render = () => {
        let {sessions, getUser} = this.props;

        return (
            <div className={'cute_sessions_list'} >

                {sessions.map( (session, k) => {
                    let key = 'session_' + k + '_' + session.id;

                    {/*console.log('cute_sessions_list: iterating: k, session = ', k, session);*/}

                    let user = getUser(session.userId);
                    {/*console.log('user = ', user);*/}


                    let onClick = this.onSessionClick.bind(this, session)
                    let avatar = (user == undefined || user.avatar == undefined) ? constants.PATIENT_FACELESS_AVATAR : user.avatar;

                    return (
                        <div className={'item'} key={key} onClick={onClick} >
                            <div className={'user_avatar_placeholder'} >
                                <img src={avatar} />
                            </div>
                            <div className={'info_placeholder'} >
                                {user == undefined ? null :
                                    <div className={'user_name'} >
                                        {user.firstName} {user.lastName}
                                    </div>
                                }
                                <div className={'session_name'} >
                                    <i className={'icon calendar'} ></i>
                                    {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                                </div>
                            </div>
                        </div>
                    )

                })}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       getUser: (userId) => {
           let {usersMap} = state.users;
           return usersMap.get(userId)
       },
       loading: state.users.loading || state.sessions.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       onLogout: (data) => {
           dispatch(actions.logOut())
       }
   }
}

SessionsList = connect(mapStateToProps, mapDispatchToProps)(SessionsList)

export default SessionsList