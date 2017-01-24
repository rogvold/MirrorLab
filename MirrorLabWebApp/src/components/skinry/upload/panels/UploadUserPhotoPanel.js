/**
 * Created by sabir on 24.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../actions/PhotosActions'

import FileUploadButton from '../../../upload/FileUploadButton'

class UploadUserPhotoPanel extends React.Component {

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

    onFileUploaded = (d) => {
        console.log('onFileUploaded: d = ', d);
        let {currentUser, createPhoto} = this.props;
        d.data = Object.assign({}, d);
        d.userId = currentUser.id;
        d.url = d.filename;
        d.version = d.version;
        console.log(' ---   >>>   CREATING PHOTO: d = ', d);
        createPhoto(d);
    }

    render = () => {

        return (
            <div className={'upload_user_photo_panel'} >

                <FileUploadButton buttonName={'Upload photo'}
                    onFileUploaded={this.onFileUploaded}
                />

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       currentUser: state.users.currentUser,
       loading: state.photos.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       createPhoto: function(data){
           return dispatch(actions.createPhoto(data))
       }
   }
}

UploadUserPhotoPanel = connect(mapStateToProps, mapDispatchToProps)(UploadUserPhotoPanel)

export default UploadUserPhotoPanel