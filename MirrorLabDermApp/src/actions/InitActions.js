/**
 * Created by sabir on 08.04.17.
 */

import * as photosActions from './PhotosActions'
import * as usersActions from './UsersActions'
import * as chatActions from './ChatActions'
import * as commentsActions from './CommentsActions'

export function init(){
    return (dispatch, getState) => {
        return dispatch(usersActions.initializeAuthorization())
            .then(
                (payload) => {
                    if (payload == undefined || payload.user == undefined){
                        return Promise.resolve();
                    }
                    let {user} = payload;
                    return dispatch(photosActions.loadUserPhotos(user.id)).then(
                        (payload) => {
                            return dispatch(chatActions.loadUserMessages(user.id))
                        }
                    ).then(
                        () => dispatch(usersActions.loadUserUserLinks(user.id))
                    ).then(
                        () => dispatch(commentsActions.loadPhotosComments())
                    )
                }
            )
    }
}
