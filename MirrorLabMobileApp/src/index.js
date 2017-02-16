/**
 * Created by sabir on 13.02.17.
 */

import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
import ParseAPI from './api/ParseAPI.js';

import * as usersActions from './actions/UsersActions.js';
import * as photosActions from './actions/PhotosActions.js';

import {reducer} from './reducers'

const loggerMiddleware = createLogger()


const store = (__DEV__ ? createStore(
            reducer,
            applyMiddleware(thunkMiddleware, loggerMiddleware)
        ) :
        createStore(
            reducer,
            applyMiddleware(thunkMiddleware)
        )
);

export default function setup() {
    class RootApp extends React.Component{

        render() {
            if (__DEV__){
                console.log('rendering app');
            }

            return (
                <Provider store={store}>

                    <App />

                </Provider>
            );
        }

    }

    ParseAPI.initParse();

    store.dispatch(init());

    return RootApp;
}



let init = () => {
    return (dispatch, getState) => {
        return dispatch(usersActions.initializeAuthorization())
            .then(
            (payload) => {
                if (payload == undefined || payload.user == undefined){
                    return Promise.resolve();
                }
                let {user} = payload;
                return dispatch(photosActions.loadUserPhotos(user.id));
            }
        )
    }
}

