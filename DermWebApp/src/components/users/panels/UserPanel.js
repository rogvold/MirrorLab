/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as usersActions from '../../../redux/actions/UsersActions'

import UpdateAboutForm from '../forms/UpdateAboutForm'
import UpdateSensorForm from '../forms/UpdateSensorForm'

import CoolPreloader from '../../preloader/CoolPreloader'

import UpdateUserForm from '../../user_links/forms/UpdateUserForm'

import * as constants from '../../../constants/config'

import UploadImageWrapper from '../../upload/UploadImageWrapper'

import UserPhotosPanel from '../../photos/panels/UserPhotosPanel'

class UserPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired,
        getUser: PropTypes.func
    }

    state = {
        tab: 'photos'
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
        let avatar = (user.avatar == undefined) ? constants.FACELESS_AVATAR : user.avatar;
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
                        <div className={'tab ' + (tab == 'photos' ? ' active ' : '')} onClick={() => {this.setState({tab: 'photos'});}} >
                            Фотографии
                        </div>

                        <div className={'tab ' + (tab == 'about' ? ' active ' : '')} onClick={() => {this.setState({tab: 'about'});}} >
                            О пациенте
                        </div>

                        <div className={'tab ' + (tab == 'settings' ? ' active ' : '')} onClick={() => {this.setState({tab: 'settings'});}} >
                            Настройки
                        </div>
                    </div>

                    <div className={'current_tab'} >

                        {tab != 'photos' ? null :
                            <div className={''} style={{textAlign: 'center', paddingTop: 10, fontSize: 16, color: '#858598', opacity: 0.99}} >
                                <UserPhotosPanel id={user.id} />
                            </div>
                        }

                        {tab != 'about' ? null :
                            <div>
                                <UpdateAboutForm about={user.about} onChange={this.onAboutChange} />
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
       loading: state.users.loading || state.photos.loading
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