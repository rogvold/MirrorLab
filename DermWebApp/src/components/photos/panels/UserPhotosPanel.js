/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../redux/actions/PhotosActions'

import moment from 'moment'

import Dialog from '../../dialog/Dialog'

import CoolPreloader from '../../preloader/CoolPreloader'

import PhotosList from '../list/PhotosList'

import PhotoPanel from './PhotoPanel'

class UserPhotosPanel extends React.Component {

    static defaultProps = {

    }

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

    render = () => {
        let {photos, selectPhoto, unselectPhoto, loading, selectedPhoto} = this.props;

        return (
            <div className={'photos_panel'} >

                <div className={'list_placeholder'} >
                    <PhotosList photos={photos} onPhotoSelect={(p) => {
                        selectPhoto(p.id);
                    }} />
                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }


            </div>
        )
    }

}


let getPhotos = (state, userId) => {
    let photos = state.photos.photosMap.toArray().filter((p) => {
        return (p.userId == userId)
    }).sort((a, b) => {
        return (b.timestamp - a.timestamp);
    })
    return photos;
}

const mapStateToProps = (state, ownProps) => {
   return {
       selectedPhoto: state.photos.photosMap.get(state.photos.selectedPhotoId),
       loading: state.photos.loading,
       photos: getPhotos(state, ownProps.id)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       selectPhoto: (photoId) => {
           return dispatch(actions.selectPhoto(photoId))
       },
       unselectPhoto: () => {
           return dispatch(actions.unselectPhoto())
       }
   }
}

UserPhotosPanel = connect(mapStateToProps, mapDispatchToProps)(UserPhotosPanel)

export default UserPhotosPanel