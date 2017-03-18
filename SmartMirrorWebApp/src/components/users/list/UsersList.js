/**
 * Created by sabir on 05.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

import * as constants from '../../../constants/AccountsConstants'

import PureRenderMixin from 'react-addons-pure-render-mixin';

class UsersList extends React.Component {

    static defaultProps = {
        users: []
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onUserClick = (u) => {
        this.props.onUserClick(u);
    }

    render = () => {
        let {users} = this.props;

        return (
            <div className={'users_list'} >
                {users.map((u, k) => {
                    let key = 'user_' + k;
                    let onClick = () => {this.onUserClick(u)};
                    let avatar = (u.avatar == undefined) ? constants.PATIENT_FACELESS_AVATAR : u.avatar;

                    return (
                        <div key={key} className={'user_item'} onClick={onClick} >
                            <div className={'top_placeholder'} >
                                <div className={'avatar_placeholder'} >
                                    <img className={'avatar'} src={avatar} />
                                </div>
                            </div>
                            <div className={'medium_placeholder'} >
                                <div className={'name_placeholder'} >
                                    <div className={'name'} >
                                        {u.firstName} {u.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className={'bottom_placeholder'} >
                                <div className={'info_links_placeholder'} >
                                    <div className={'info_item'} >
                                        <div className={'icon_placeholder'} >
                                            <i className={'icon wait'} ></i>
                                        </div>
                                        <div className={'info_placeholder'} >
                                            <div className={'top'} >
                                                Посл. изм.
                                            </div>
                                            <div className={'bottom'} >
                                                {u.lastTimestamp == undefined ?
                                                    <span>нет измерений</span> :
                                                    <span>{moment(u.lastTimestamp).format('DD-MM HH:mm')}</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className={'info_item'} style={{display: 'none'}} >
                                        <div className={'icon_placeholder'} >
                                            <i className={'icon calendar'} ></i>
                                        </div>
                                        <div className={'info_placeholder'} >
                                            <div className={'top'} >
                                                Добавлен
                                            </div>
                                            <div className={'bottom'} >
                                                {moment(+new Date() - 86400000 * 5 - 86400000 * 5 * Math.random()).format('DD.MM.YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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

//UsersList = connect(mapStateToProps, mapDispatchToProps)(UsersList)

export default UsersList