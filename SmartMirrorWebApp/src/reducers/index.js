/**
 * Created by sabir on 28.11.16.
 */

import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import SessionsReducer from './SessionsReducer.js';
import NotesReducer from './NotesReducer.js';
import ECGViewerReducer from './ECGViewerReducer.js';
import FileUploadReducer from './FileUploadReducer.js';
import PhotosReducer from './PhotosReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    sessions: SessionsReducer,
    notes: NotesReducer,
    ecg: ECGViewerReducer,
    upload: FileUploadReducer,
    photos: PhotosReducer
});