/**
 * Created by sabir on 04.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../actions/PhotosActions'

class UpdatePhotoStatusPanel extends React.Component {

    static defaultProps = {
        id: undefined
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

    updateStatus = (newStatus) => {
        let {id, updatePhoto} = this.props;
        let data = {
            id: id,
            status: newStatus
        }
        updatePhoto(data);
    }

    render = () => {
        let {loading, photo} = this.props;
        if (photo == undefined){
            return null;
        }
        let {status} = photo;
        if (status == undefined){
            status = 'new';
        }

        return (
            <div className={'update_photo_switcher'} >

                <div className={'item'} onClick={() => {this.updateStatus('new')}} >
                    <i className={'icon ' + (status == 'new' ? 'checkmark box' : 'square outline')} ></i> NEW
                </div>

                <div className={'item'} onClick={() => {this.updateStatus('finished')}} >
                    <i className={'icon ' + (status == 'finished' ? 'checkmark box' : 'square outline')} ></i> FINISHED
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       photo: state.photos.photosMap[ownProps.id],
       loading: state.photos.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       updatePhoto: (data) => {
           return dispatch(actions.updatePhoto(data))
       }
   }
}

UpdatePhotoStatusPanel = connect(mapStateToProps, mapDispatchToProps)(UpdatePhotoStatusPanel)

export default UpdatePhotoStatusPanel