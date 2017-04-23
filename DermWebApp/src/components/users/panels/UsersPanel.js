/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from '../../dialog/Dialog'

import UserPanel from './UserPanel'

import moment from 'moment';

import UsersList from '../list/UsersList'

class UsersPanel extends React.Component {

    static defaultProps = {
        searchQuery: ''
    }

    static propTypes = {
        searchQuery: PropTypes.string
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

    onUserClick = (u) => {
        console.log('onUserClick: u = ', u);
        this.setState({
            selectedUserId: u.id
        });
    }

    getUsers = () => {
        let {users,searchQuery} = this.props;
        var s = searchQuery.toLowerCase();
        let res = users.filter((user, k) => {
            if (s == '' || user.firstName.toLowerCase().indexOf(s) > -1 ||
                            user.lastName.toLowerCase().indexOf(s) > -1 ){
                return true;
            }
            return false;
        })
        return res;
    }

    render = () => {
        let users = this.getUsers();
        let {selectedUserId} = this.state;

        return (
            <div className={'users_panel'} >

                <UsersList users={users} onUserClick={this.onUserClick} />

                {selectedUserId == undefined ? null :
                    <Dialog onClose={() => {this.setState({selectedUserId: undefined})}} >
                        <UserPanel id={selectedUserId} />
                    </Dialog>
                }

            </div>
        )
    }

}

let getUsers = (state) => {
    let {currentUserId, usersMap} = state.users;
    let {photosMap} = state.photos;
    let arr = usersMap.toList().toJS();
    if (currentUserId == undefined){return []}
    const getLastUserPhotoTimestamp = (userId) => {
        let photos = photosMap.toArray().filter(p => (p.userId == userId)).sort((b, a) => {return (b.timestamp - a.timestamp)});
        return (photos.length == 0 ? undefined : photos[0].timestamp);
    }
    arr = arr.filter(function(u){return (u.id != currentUserId)}).map((us) => {return Object.assign({}, us, {lastTimestamp: getLastUserPhotoTimestamp(us.id)})});
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp)
    });
    return arr;
}

const mapStateToProps = (state) => {
   return {
       users: getUsers(state)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

UsersPanel = connect(mapStateToProps, mapDispatchToProps)(UsersPanel)

export default UsersPanel