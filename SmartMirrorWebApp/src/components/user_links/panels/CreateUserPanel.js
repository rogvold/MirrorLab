/**
 * Created by sabir on 14.10.16.
 */


import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var UpdateUserForm = require('../forms/UpdateUserForm');

import * as actions from '../../../actions/UsersActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class CreateUserPanel extends React.Component {

    static defaultProps = {
        onCreated: () => {
            alert('user is created!');
        }
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

    createUser = (data) => {
        let {onCreated, createUser} = this.props;
        createUser(data).then(() => {
            console.log('firing onCreated');
            onCreated();
        });
    }

    getErrorContent = () => {
        let {error} = this.props;
        if (error == undefined){
            return null;
        }
        return (
            <div>
                {error.message}
            </div>
        );
    }

    render = () => {
        let {loading} = this.props;

        return (
            <div className={'create_user_panel'} >

                <UpdateUserForm onSubmit={this.createUser} errorContent={this.getErrorContent()} />

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       error: state.users.error,
       loading: state.users.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       createUser: (data) => {
            return dispatch(actions.createUser(data));
       }
   }
}

CreateUserPanel = connect(mapStateToProps, mapDispatchToProps)(CreateUserPanel)

export default CreateUserPanel