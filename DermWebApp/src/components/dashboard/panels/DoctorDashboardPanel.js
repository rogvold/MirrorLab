/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as photosActions from '../../../redux/actions/PhotosActions'

import CoolPreloader from '../../preloader/CoolPreloader'

// import CalendarPanel from '../../calendar/CalendarPanel'

import PhotosCalendarPanel from '../calendar/PhotosCalendarPanel'

import PhotosList from '../list/PhotosList'

class DoctorDashboardPanel extends React.Component {

    static defaultProps = {}

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

    onSessionClick = (sess) => {
        let {selectSession} = this.props;
        selectSession(sess.id);
    }

    render = () => {
        let {loading, users, photos, selectPhoto, comments} = this.props;
        let hasRight = (photos.length > 0);

        return (
            <div className={'doctor_dashboard_panel '} >

                <div className={'top_block'} >

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/girl.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                {users.length}
                            </div>
                            <div className={'bottom'} >
                                ПАЦИЕНТЫ
                            </div>
                        </div>

                    </div>

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/yearbook.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                {photos.length}
                            </div>
                            <div className={'bottom'} >
                                ФОТОГРАФИИ
                            </div>
                        </div>

                    </div>

                    <div className={'section'} >
                        <div className={'image_placeholder'} >
                            <img src={'assets/images/comment.png'} />
                        </div>
                        <div className={'info_placeholder'} >
                            <div className={'top'} >
                                {comments.length}
                            </div>
                            <div className={'bottom'} >
                                КОМЕНТАРИИ
                            </div>
                        </div>
                    </div>

                </div>


                <div className={'middle_block '  + (hasRight == true ? ' with_right ' : '') } >

                    <div className={'left_block'} >

                        <div className={'header_text'} >
                            Календарь фотографий
                        </div>

                        <PhotosCalendarPanel
                            onPhotoClick={(p) => {selectPhoto(p.id)}}
                            photos={photos} />

                    </div>

                    <div className={'right_block'} >

                        <div className={'header_text'} >
                            Последние фотографии
                        </div>

                        <PhotosList photos={photos} onPhotoClick={(p) => {selectPhoto(p.id)}} />

                    </div>

                </div>




                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getAllData = (state) => {
    let {usersMap, currentUserId} = state.users;
    let users = usersMap.toArray().filter((u) => {return (u.id != currentUserId)})
    let photos = state.photos.photosMap.toArray().sort((a, b) => {
        return (b.timestamp - a.timestamp);
    });
    let comments = state.comments.commentsMap.toArray().sort((a, b) => {
        return (b.timestamp - a.timestamp);
    });
    return {
        photos: photos,
        users: users,
        comments: comments
    }
}

const mapStateToProps = (state) => {
    let data = getAllData(state);
   return {
       loading: state.users.loading || state.photos.loading,
       userId: state.users.currentUserId,
       users: data.users,
       photos: data.photos,
       comments: data.comments
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

       selectPhoto: (photoId) => {
           return dispatch(photosActions.selectPhoto(photoId))
       }
   }
}

DoctorDashboardPanel = connect(mapStateToProps, mapDispatchToProps)(DoctorDashboardPanel)

export default DoctorDashboardPanel