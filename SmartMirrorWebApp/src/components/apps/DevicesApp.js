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

import UsersPanel from '../users/panels/UsersPanel'

class DevicesApp extends React.Component {

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

                <div className={'container'} >

                    <div className={''} style={{textAlign: 'center', padding: 30,
                        fontSize: 16, color: '#858598', opacity: 0.7}} >
                        Under construction
                    </div>

                </div>

            </div>
        )
    }

    render(){

        return (
            <CorporateTemplate content={this.getContent()} active={'devices'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId)
    }
}


DevicesApp = connect(mapStateToProps, null)(DevicesApp)

export default DevicesApp