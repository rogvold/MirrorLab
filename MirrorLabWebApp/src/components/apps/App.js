/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Router, Route, browserHistory, useRouterHistory, hashHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

//apps
import DevApp from './DevApp.js';
import GuestIndexApp from './guest/GuestIndexApp.js';
import UserIndexApp from './user/UserIndexApp.js';
import LoginApp from './user/LoginApp'

class App extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
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

    getUserRoute() {

        console.log('getUserRoute occured');

        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/dev" component={DevApp}/>


            </Router>
        );
    }

    getGuestRoute = () => {
        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={GuestIndexApp} >
                    <IndexRoute component={GuestIndexApp} />
                </Route>

                <Route path="/dev" component={DevApp}/>

            </Router>
        );
    }

    render() {
        let {initialized} = this.props;
        console.log('rendering App: initialized = ', initialized);

        if (initialized == false){
            return (
                <div className={'initializing_placeholder'} >
                    loading...
                </div>
            );
        }

        var user = this.props.currentUser;
        if (user == undefined){
            return (
                <LoginApp />
            );
        }

        return this.getUserRoute();
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        initialized: state.users.initialized
    }
}

App = connect(mapStateToProps, null)(App)

export default App