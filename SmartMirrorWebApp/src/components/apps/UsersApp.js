/**
 * Created by sabir on 03.02.17.
 */
/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import SessionsListPanel from '../sessions/panels/SessionsListPanel.js'

import CorporateTemplate from '../template/CorporateTemplate'

import ExpressUsersPanel from '../users/panels/ExpressUsersPanel'

import SelectedSessionPanel from '../sessions/panels/SelectedSessionPanel'

class UsersApp extends React.Component {

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

                <div className={'container'} >

                    <ExpressUsersPanel />

                </div>

            </div>
        )
    }

    render(){

        return (
            <CorporateTemplate content={this.getContent()} active={'users'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId)
    }
}


UsersApp = connect(mapStateToProps, null)(UsersApp)

export default UsersApp