/**
 * Created by sabir on 28.11.16.
 */
import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
import ParseAPI from './api/ParseAPI.js';

import * as usersActions from './actions/UsersActions.js';
import * as sessionsActions from './actions/SessionsActions.js';
import * as photosActions from './actions/PhotosActions.js';


import {reducer} from './reducers'

const loggerMiddleware = createLogger()

//redux-persist
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'
import immutableTransform from 'redux-persist-transform-immutable'

const store = createStore(
    reducer,
    undefined,
    compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware),
        autoRehydrate()
    )
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




let init = () => {
    return (dispatch, getState) => {
        return dispatch(usersActions.initializeAuthorization()).then(
            (payload) => {
                if (payload == undefined || payload.user == undefined){
                    return Promise.resolve();
                }
                let {user} = payload;
                // return dispatch(sessionsActions.loadFriendsSessions(user.id));
                return dispatch(photosActions.loadFriendsPhotos());
            }
        )
    }
}

persistStore(store, {storage: localForage, transforms: [immutableTransform()]}, () => {
    store.dispatch(init());
})

// store.dispatch(init());