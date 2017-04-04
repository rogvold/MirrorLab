/**
 * Created by sabir on 24.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PimpledImage from '../image/PimpledImage'

import SkinryImage from '../image/SkinryImage'
import SkinryUserImage from '../image/SkinryUserImage'

import SkinryUpdatablePimpleEditorPanel from '../editor/SkinryUpdatablePimpleEditorPanel'

import moment from 'moment'

import UpdatePhotoStatusPanel from '../../status/panels/UpdatePhotoStatusPanel'

class PhotosList extends React.Component {

    static defaultProps = {
        photos: []
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

    onPhotoClick = (p) => {
        this.props.onPhotoClick(p);
    }

    onPhotoEditOpen = (p) => {
        console.log('onPhotoEditOpen: p = ', p);
        this.props.onPhotoEditOpen(p);
    }

    render = () => {
        let {photos} = this.props;

        return (
            <div className={'photos_list'} >

                {photos.map((p, k) => {
                    let key = 'photo_' + k + '_' + p.url;
                    let data = p.data;
                    let spots = (data.spots == undefined) ? [] : data.spots;
                    let onClick = this.onPhotoClick.bind(this, p);
                    let onEditOpen = this.onPhotoEditOpen.bind(this, p);
                    let status = (p.status == undefined) ? 'new' : p.status;

                    return (
                        <div className={'photo ' + status} key={key} >

                            <div className={'img_placeholder'} >

                                {/*<PimpledImage src={p.url} pimples={data.spots} />*/}

                                <SkinryUserImage id={p.id}  />

                            </div>

                            <div className={'info_placeholder'}  >
                                <div onClick={onClick}  className={'pointer'}  >
                                    <i className={'icon expand'} ></i> view
                                </div>

                                <div onClick={onEditOpen} className={'pointer'} >
                                    <i className={'icon pencil'} ></i> edit
                                </div>

                                <UpdatePhotoStatusPanel id={p.id} />


                                <div className={'date'} >
                                    <i className={'icon calendar'} ></i> {moment(p.timestamp).format('LLL')}
                                </div>
                                <div className={'api_version'} >
                                    <i className={'icon bug'} ></i> algorithm version: {p.version}
                                </div>

                                <div className={'spots_number'} >
                                    <i className={'icon bullseye'} ></i> spots number: <b>{spots.length}</b>
                                </div>


                            </div>

                        </div>
                    )
                })}

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//PhotosList = connect(mapStateToProps, mapDispatchToProps)(PhotosList)

export default PhotosList