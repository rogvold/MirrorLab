/**
 * Created by sabir on 02.01.17.
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UsersReducer from './UsersReducer.js';
import PhotosReducer from './PhotosReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    photos: PhotosReducer
});
