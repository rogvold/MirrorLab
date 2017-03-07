/**
 * Created by sabir on 02.01.17.
 */
import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App'

//api
import ParseAPI from './api/ParseAPI';

import * as usersActions from './actions/UsersActions';

import {reducer} from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ParseAPI.initParse();


class RootApp extends React.Component{

    render() {
        console.log('rendering app');
        return (
            <Provider store={store}>

                <App />

            </Provider>
        );
    }

}

ReactDOM.render(
    <RootApp />,
    document.querySelector('#main')
);

let dispatchPreparations = () => {
    return (dispatch, getState) => {
        dispatch(usersActions.initializeAuthorization());
    }
}

store.dispatch(dispatchPreparations());
