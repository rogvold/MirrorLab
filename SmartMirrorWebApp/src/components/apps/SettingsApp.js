/**
 * Created by sabir on 03.02.17.
 */
/**
 * Created by sabir on 03.02.17.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import CorporateTemplate from '../template/CorporateTemplate'

import EditProfilePanel from '../profile/panels/EditProfilePanel'

class SettingsApp extends React.Component {

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


                <EditProfilePanel id={user.id} />


            </div>
        )
    }

    render(){

        return (
            <CorporateTemplate content={this.getContent()} active={'settings'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId)
    }
}


SettingsApp = connect(mapStateToProps, null)(SettingsApp)

export default SettingsApp