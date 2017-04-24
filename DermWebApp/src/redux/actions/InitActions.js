/**
 * Created by sabir on 25.04.17.
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
                    return dispatch(usersActions.loadUserUserLinks(user.id));
                }
            ).then(
                () => {
                    return dispatch(photosActions.loadPhotosOfFriends())
                }
            ).then(
                () => {
                    return dispatch(chatActions.loadUserMessages())
                }
            ).then(
                () => {
                    return dispatch(commentsActions.loadMyComments())
                }
            )
    }
}
