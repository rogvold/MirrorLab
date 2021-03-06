/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as photosActions from '../../../redux/actions/PhotosActions'

import CoolModal from '../../modals/CoolModal'

import PhotoPanel from './PhotoPanel'

class SelectedPhotoPanel extends React.Component {

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

    render = () => {
        let {closePhoto, selectedPhotoId} = this.props;
        console.log('SelectedPhotoPanel: selectedPhotoId = ', selectedPhotoId);
        if (selectedPhotoId == undefined){
            return null;
        }

        return (
            <CoolModal close={() => {closePhoto()}} >
                <PhotoPanel id={selectedPhotoId} />
            </CoolModal>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        selectedPhotoId: state.photos.selectedPhotoId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePhoto: () => {
            return dispatch(photosActions.unselectPhoto())
        }
    }
}

SelectedPhotoPanel = connect(mapStateToProps, mapDispatchToProps)(SelectedPhotoPanel)

export default SelectedPhotoPanel