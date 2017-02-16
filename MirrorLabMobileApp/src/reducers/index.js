/**
 * Created by sabir on 13.02.17.
 */
import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import NavigationReducer from './NavigationReducer.js';
import PhotosReducer from './PhotosReducer.js';
import UploadReducer from './UploadReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    photos: PhotosReducer,
    navigation: NavigationReducer,
    upload: UploadReducer

});