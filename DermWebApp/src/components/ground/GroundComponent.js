/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as photosActions from '../../redux/actions/PhotosActions'

import CoolModal from '../modals/CoolModal'

import PhotoPanel from '../photos/panels/PhotoPanel'
import SelectedPhotoPanel from '../photos/panels/SelectedPhotoPanel'

import ChatDaemon from '../chat/daemons/ChatDaemon'

class GroundComponent extends React.Component {

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

        return (
            <div>

                <SelectedPhotoPanel />

                <ChatDaemon />

            </div>
        )
    }

}


// const mapStateToProps = (state) => {
//    return {
//        selectedPhotoId: state.photos.selectedPhotoId
//    }
// }
//
// const mapDispatchToProps = (dispatch) => {
//    return {
//        closePhoto: () => {
//            return dispatch(photosActions.unselectPhoto())
//        }
//    }
// }
//
// GroundComponent = connect(mapStateToProps, mapDispatchToProps)(GroundComponent)

export default GroundComponent