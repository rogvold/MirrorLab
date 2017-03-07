/**
 * Created by sabir on 02.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/PhotosActions'

import SkinryPimpleEditor from './SkinryPimpleEditor'

import CoolPreloader from '../../preloader/CoolPreloader'

class SkinryUpdatablePimpleEditorPanel extends React.Component {

    static defaultProps = {
        id: undefined,
        photoUpdated: () => {

        }
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

    onSave = (newPoints) => {
        console.log('SkinryUpdatablePimpleEditorPanel: newPoints = ', newPoints);
        let {photo, updatePhoto, photoUpdated} = this.props;
        let newData = Object.assign({}, photo.data, {spots: newPoints});
        let photoToUpdate = Object.assign({}, {id: photo.id, data: newData});
        updatePhoto(photoToUpdate).then(function(){
            photoUpdated();
        })
    }

    render = () => {
        let {photo, loading} = this.props;
        if (photo == undefined){
            return null;
        }

        console.log('photo = ', photo);

        return (
            <div className={'updatable_pimple_editor_panel'} >

                {loading == false ? null :
                    <CoolPreloader />
                }

                <SkinryPimpleEditor
                    onSave={this.onSave}
                    src={photo.url} points={photo.data.spots} />

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       loading: state.photos.loading,
       photo: state.photos.photosMap[ownProps.id]
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       updatePhoto: function(data){
            return dispatch(actions.updatePhoto(data))
       }
   }
}

SkinryUpdatablePimpleEditorPanel = connect(mapStateToProps, mapDispatchToProps)(SkinryUpdatablePimpleEditorPanel)

export default SkinryUpdatablePimpleEditorPanel