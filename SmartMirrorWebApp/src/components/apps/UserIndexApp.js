/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import SimpleTemplate from '../templates/SimpleUserTemplate.js';

import { connect } from 'react-redux';

import Dialog from '../dialog/Dialog.js';

import SessionsListPanel from '../sessions/panels/SessionsListPanel.js'


import HRMDeviceEmulator from '../emulators/HRMDeviceEmulator.js';

import CorporateTemplate from '../template/CorporateTemplate'

import DoctorDashboardPanel from '../dashboard/panels/DoctorDashboardPanel'

import SelectedSessionPanel from '../sessions/panels/SelectedSessionPanel'

class UserIndexApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'user_index_app_content'} >

                <SelectedSessionPanel />

                <DoctorDashboardPanel />

            </div>
        )
    }

    render(){

        return (
            <CorporateTemplate content={this.getContent()} />
        )
    }

}


const mapStateToProps = (state) => {
    console.log('UserIndexApp: mapStateToProps: state = ', state);
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId)
    }
}


UserIndexApp = connect(mapStateToProps, null)(UserIndexApp)

export default UserIndexApp