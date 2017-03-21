/**
 * Created by sabir on 01.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SkinryImage from './SkinryImage'

class SkinryUserImage extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        getPhotoById: PropTypes.func,
        id: PropTypes.string
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPhoto = () => {
        let {getPhotoById, id} = this.props;
        return getPhotoById(id);
    }

    render = () => {
        let p = this.getPhoto();

        // console.log('rendering SkinryUserImage: photo = ', p);

        if (p == undefined || p.data == undefined || p.data.imgInfo == undefined){
            return null;
        }

        return (
            <SkinryImage landmarks={p.data.imgInfo.landmarksXY} url={p.url}
                         undereyes={p.data.undereyes}
                         spots={p.data.spots}
            />
        )
    }

}

let getPhotoById_ = (state, id) => {
    let map = state.photos.photosMap;
    return map[id]
}

const mapStateToProps = (state) => {
   return {
       getPhotoById: (id) => {
           return getPhotoById_(state, id);
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       // onLogout: (data) => {
       //     dispatch(actions.logOut())
       // }
   }
}

SkinryUserImage = connect(mapStateToProps, mapDispatchToProps)(SkinryUserImage)

export default SkinryUserImage