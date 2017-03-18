/**
 * Created by sabir on 20.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as usersActions from '../../../actions/UsersActions'
import * as sessionsActions from '../../../actions/SessionsActions'

import UpdateAboutForm from '../forms/UpdateAboutForm'
import UpdateSensorForm from '../forms/UpdateSensorForm'

import CoolPreloader from '../../preloader/CoolPreloader'

import UpdateUserForm from '../../user_links/forms/UpdateUserForm'

import * as constants from '../../../constants/AccountsConstants'

import SessionsListPanel from '../../sessions/panels/SessionsListPanel'

import UserNotesPanel from '../../notes/panels/UserNotesPanel'

import UploadImageWrapper from '../../upload/UploadImageWrapper'

class UserPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired,
        getUser: PropTypes.func
    }

    state = {
        tab: 'sessions'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getUser = () => {
        let {id, getUser} = this.props;
        let user = getUser(id);
        return user;
    }

    onAboutChange = (newAbout) => {
        let data = {
            id: this.props.id,
            about: newAbout
        }
        return this.props.updateUser(data);
    }

    onDeviceCodeChange = (newCode) => {
        let data = {
            id: this.props.id,
            deviceCode: newCode
        }
        return this.props.updateUser(data);
    }

    onUserInfoSubmit = (d) => {
        let data = Object.assign({}, d, {id: this.props.id});
        return this.props.updateUser(data);
    }

    onAvatarUploaded = (url) => {
        console.log('onAvatarUploaded: url = ', url);
        let data = {
            id: this.props.id,
            avatar: url
        }
        return this.props.updateUser(data);
    }

    render = () => {
        let user = this.getUser();
        if (user == undefined){
            return null;
        }
        let avatar = (user.avatar == undefined) ? constants.PATIENT_FACELESS_AVATAR : user.avatar;
        let {tab} = this.state;

        return (
            <div className={'user_panel'} >

                <div className={'top'}  >

                    <div className={'avatar_placeholder'} >
                        <img className={'avatar'} src={avatar} />
                        <div className={'edit_placeholder'}>
                            <span>
                                <UploadImageWrapper onImageUploaded={this.onAvatarUploaded} >
                                    <i className={'icon pencil'} ></i>
                                </UploadImageWrapper>
                            </span>
                        </div>
                    </div>

                    <div className={'name_placeholder'} >
                        <div className={'name'} >
                            {user.firstName} {user.lastName}
                        </div>
                    </div>

                </div>

                <div className={'bottom'} >

                    <div className={'tabs_placeholder'} >
                        <div className={'tab ' + (tab == 'sessions' ? ' active ' : '')} onClick={() => {this.setState({tab: 'sessions'});}} >
                            Кардиограммы
                        </div>

                        <div className={'tab ' + (tab == 'notes' ? ' active ' : '')} onClick={() => {this.setState({tab: 'notes'});}} >
                            Расшифровки
                        </div>

                        <div className={'tab ' + (tab == 'about' ? ' active ' : '')} onClick={() => {this.setState({tab: 'about'});}} >
                            О пациенте
                        </div>
                        <div className={'tab ' + (tab == 'sensor' ? ' active ' : '')} onClick={() => {this.setState({tab: 'sensor'});}} >
                            Датчик
                        </div>
                        <div className={'tab ' + (tab == 'settings' ? ' active ' : '')} onClick={() => {this.setState({tab: 'settings'});}} >
                            Настройки
                        </div>
                    </div>

                    <div className={'current_tab'} >

                        {tab != 'sessions' ? null :
                            <div className={''} style={{textAlign: 'center', paddingTop: 10, fontSize: 16, color: '#858598', opacity: 0.99}} >
                                <SessionsListPanel userId={user.id} />
                            </div>
                        }

                        {tab != 'about' ? null :
                            <div>
                                <UpdateAboutForm about={user.about} onChange={this.onAboutChange} />
                            </div>
                        }

                        {tab != 'sensor' ? null :
                            <div>
                                <UpdateSensorForm deviceCode={user.deviceCode} onChange={this.onDeviceCodeChange} />
                            </div>
                        }

                        {tab != 'settings' ? null :
                            <div>
                                <UpdateUserForm firstName={user.firstName} buttonName={'Сохранить'}
                                                showAuthFields={false}
                                                lastName={user.lastName} onSubmit={this.onUserInfoSubmit}
                                                gender={user.gender} />
                            </div>
                        }

                        {tab != 'notes' ? null :
                            <div>
                                <UserNotesPanel userId={user.id} shouldShowCreateBlock={false} />
                            </div>
                        }


                    </div>



                </div>

                {this.props.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getUser = (state, userId) => {
    let usersMap = state.users.usersMap;
    if (usersMap == undefined || userId == undefined){
        return undefined;
    }
    return usersMap.get(userId);
}

const mapStateToProps = (state) => {
   return {
       getUser: (userId) => {
           return getUser(state, userId);
       },
       loading: state.users.loading || state.sessions.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        updateUser: (data) => {
            return dispatch(usersActions.updateUser(data))
        }
   }
}

UserPanel = connect(mapStateToProps, mapDispatchToProps)(UserPanel)

export default UserPanel