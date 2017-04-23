/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SearchableUsersPanel from './SearchableUsersPanel'

import Dialog from '../../dialog/Dialog'

import AddUserTabbedPanel from '../../user_links/panels/AddUserTabbedPanel'

import * as actions from '../../../redux/actions/UsersActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class ExpressUsersPanel extends React.Component {

    static defaultProps = {

        canAddUser: false

    }

    static propTypes = {}

    state = {
        addNewVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserUserLinks} = this.props;
        loadUserUserLinks();
    }

    componentWillReceiveProps() {

    }

    getAddNewPanelContent = () => {
        return (
            <div className={'add_new_user_panel'} >
                <AddUserTabbedPanel onAdded={() => {this.setState({addNewVisible: false})}} />
            </div>
        )
    }

    render = () => {
        let {users, loading, canAddUser} = this.props;
        let {addNewVisible} = this.state;

        console.log('ExpressUsersPanel: render: users = ', users);

        return (
            <div className={'express_users_panel'} >

                <div className={'add_new_user_placeholder'} >

                    <div className={'text_placeholder'} >
                        Количество пациентов - <b>{users.length}</b>
                    </div>

                    {canAddUser == false ? null :
                        <div className={'button_placeholder'}  >
                            <button className={'ui button'} onClick={() => {this.setState({addNewVisible: true});}} >
                                Добавить пациента
                                <i className={'icon plus'} ></i>
                            </button>
                        </div>
                    }



                </div>

                <div className={'searchable_users_panel_placeholder'} >
                    {loading == false ? null :
                        <div className={'loading_placeholder'} >
                            загрузка...
                        </div>
                    }

                    <SearchableUsersPanel shouldShowSearchBar={(users != undefined && users.length > 6)} />

                </div>

                {addNewVisible == false ? null :
                    <Dialog onClose={() => {this.setState({addNewVisible: false});}} level={2} >
                        {this.getAddNewPanelContent()}
                    </Dialog>
                }


            </div>
        )
    }

}


let getUsers = (state) => {
    let {currentUserId, usersMap} = state.users;
    let arr = usersMap.toArray();
    console.log('getUsers: arr = ', arr);
    if (currentUserId == undefined){return []}
    arr = arr.filter(function(u){return (u.id != currentUserId)})
    return arr;
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        loading: state.users.loading || state.photos.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserUserLinks: () => {
            return dispatch(actions.loadUserUserLinks())
        }
    }
}

ExpressUsersPanel = connect(mapStateToProps, mapDispatchToProps)(ExpressUsersPanel)

export default ExpressUsersPanel