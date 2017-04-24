/**
 * Created by sabir on 24.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UserPhotosPanel from '../../photos/panels/UserPhotosPanel'

import moment from 'moment'

class TabbedUserInfoPanel extends React.Component {

    static defaultProps = {
        userId: undefined
    }

    static propTypes = {}

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

    render = () => {
        let {tab} = this.state;
        let {userId, user} = this.props;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'tabbed_user_info_panel'}>

                <div className={'tabs_placeholder'} >

                    <div className={'tab ' + (tab == 'photos' ? 'active' : '')} onClick={() => {this.setState({tab: 'photos'})}} >
                        Фотографии
                    </div>

                    <div className={'tab ' + (tab == 'info' ? 'active' : '')} onClick={() => {this.setState({tab: 'info'})}} >
                        Информация
                    </div>

                </div>


                <div className={'content_placeholder'} >

                    {tab != 'photos' ? null :
                        <div>
                            <UserPhotosPanel id={userId} />
                        </div>
                    }

                    {tab != 'info' ? null :
                        <div className={'user_info_placeholder'} >

                            <div className={'signup_date_placeholder'} >
                                <div className={'data'} >
                                    Дата регистрации: {moment(user.timestamp).format('DD.MM.YYYY HH:mm')}
                                </div>
                            </div>

                            <div className={'email_placeholder'} >
                                <div className={'email'} >
                                    Email: {user.email}
                                </div>
                            </div>

                        </div>
                    }

                </div>

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       user: state.users.usersMap.get(ownProps.userId)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

TabbedUserInfoPanel = connect(mapStateToProps, mapDispatchToProps)(TabbedUserInfoPanel)

export default TabbedUserInfoPanel