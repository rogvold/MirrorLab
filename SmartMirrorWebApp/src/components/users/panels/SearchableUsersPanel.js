/**
 * Created by sabir on 04.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UsersPanel from './UsersPanel'

class SearchableUsersPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        searchQuery: ''
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
        let {searchQuery} = this.state;

        return (
            <div className={'searchable_users_panel'} >

                <div className={'search_panel'} >
                    <div className={'ui left icon input fluid search_input_placeholder'} >
                        <input onChange={(evt) => {this.setState({searchQuery: evt.target.value})}}
                               value={searchQuery} placeholder={'Поиск по пациентам...'} />
                        <i className="search icon"></i>
                    </div>
                </div>

                <UsersPanel searchQuery={searchQuery} />

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

//SearchableUsersPanel = connect(mapStateToProps, mapDispatchToProps)(SearchableUsersPanel)

export default SearchableUsersPanel