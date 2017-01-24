/**
 * Created by sabir on 24.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/PhotosActions'

import PhotosList from '../list/PhotosList'

import CoolPreloader from '../../preloader/CoolPreloader'

import UploadUserPhotoPanel from '../upload/panels/UploadUserPhotoPanel'

import PimpledImage from '../image/PimpledImage'

class UserPhotosPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        selectedPhoto: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserPhotos, userId, currentUser} = this.props;
        if (userId == undefined && currentUser != undefined){
            userId = currentUser.id;
        }
        loadUserPhotos(userId);
    }

    componentWillReceiveProps() {

    }

    getPhotos = () => {
        let {loadUserPhotos, userId, currentUser, getUserPhotos} = this.props;
        if (userId == undefined && currentUser != undefined){
            userId = currentUser.id;
        }
        return getUserPhotos(userId);
    }

    onPhotoClick = (p) => {
        console.log('onPhotoClick: p = ', p);
        this.setState({
            selectedPhoto: p
        })
    }

    getSelectedPhotoContent = () => {
        let {selectedPhoto} = this.state;
        let {getPhoto} = this.props;
        if (selectedPhoto == undefined){
            return null;
        }
        let photo = getPhoto(selectedPhoto.id);
        if (photo == undefined){
            return null;
        }
        console.log('getSelectedPhotoContent: photo = ', photo);

        return (
            <div className={'selected_photo_content'} >

                <div className={'left'} >
                    <PimpledImage src={photo.url} pimples={photo.data.spots} switchViewEnabled={true} />
                </div>

                <div className={'right'} >

                    <div className={'close_button_placeholder'}>
                        <div className={'close_button'} onClick={() => {this.setState({selectedPhoto: undefined})}} >
                            <i className={'icon remove'} ></i>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    render = () => {
        let photos = this.getPhotos();
        let {loading} = this.props;

        return (
            <div className={'user_images_panel'} >

                <UploadUserPhotoPanel />

                <div className={'photos_list_placeholder'} >
                    <PhotosList photos={photos} onPhotoClick={this.onPhotoClick} />
                </div>

                {loading == false ? null :
                    <CoolPreloader />
                }

                {this.getSelectedPhotoContent()}

            </div>
        )
    }

}

const getPhotos = (state, userId) => {
    let arr = [];
    let map = state.photos.photosMap;
    for (var key in map){
        let p = map[key];
        arr.push(p);
    }
    arr.sort((a, b) => {
        return (b.timestamp - a.timestamp);
    });
    return arr;
}

const mapStateToProps = (state) => {
   return {
       currentUser: state.users.currentUser,
       loading: state.photos.loading,
       getUserPhotos: function(userId){
           return getPhotos(state, userId);
       },
       getPhoto: function(id){
           return state.photos.photosMap[id]
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserPhotos: function(userId){
           return dispatch(actions.loadUserPhotos(userId));
       }
   }
}

UserPhotosPanel = connect(mapStateToProps, mapDispatchToProps)(UserPhotosPanel)

export default UserPhotosPanel