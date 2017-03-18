/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../constants/AccountsConstants'

class NoSessionsPanel extends React.Component {

    static defaultProps = {
        text: 'У пациента еще нет записанных электрокардиограмм...'
    }

    static propTypes = {}

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

        return (
            <div className={'no_sessions_panel'} >

                <div className={'no_sessions_img_placeholder'} >
                    <img className={'no_sessions_img'} src={constants.NO_SESSIONS_IMAGE} />
                </div>
                <div className={'no_sessions_text'} >
                    {this.props.text}
                </div>


            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//NoSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(NoSessionsPanel)

export default NoSessionsPanel