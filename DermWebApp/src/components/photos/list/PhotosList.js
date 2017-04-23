/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment'

class PhotosList extends React.Component {

    static defaultProps = {
        photos: [],
        onPhotoSelect: (p) => {

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

    render = () => {
        let {photos, onPhotoSelect} = this.props;

        return (
            <div className={'photos_list'} >
                {photos.map((p) => {
                    let key = 'photo_item_' + p.id;

                    return (
                        <div className={'photo_item'} key={key} onClick={() => {onPhotoSelect(p)}} >

                            <div className={'image_placeholder'} >
                                <img src={p.thumbnail} />
                            </div>

                            <div className={'date_placeholder'} >
                                <i className={'icon '} ></i>
                                {moment(p.timestamp).format('D MMMM YYYY HH:mm')}
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