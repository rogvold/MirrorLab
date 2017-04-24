/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../../constants/config'

import moment from 'moment';

class PhotosList extends React.Component {

    static defaultProps = {
        photos: [],
        onPhotoClick: (session) => {

        }
    }

    static propTypes = {

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



    render = () => {
        let {photos, getUser, onPhotoClick} = this.props;

        return (
            <div className={'cute_photos_list'} >

                {photos.map( (photo, k) => {
                    let key = 'photo_' + k + '_' + photo.id;

                    let user = getUser(photo.userId);

                    let avatar = (user == undefined || user.avatar == undefined) ? constants.FACELESS_AVATAR : user.avatar;

                    return (
                        <div className={'item'} key={key} onClick={() => {onPhotoClick(photo)}} >
                            <div className={'img_placeholder'} >
                                <img src={photo.thumbnail} />
                            </div>
                            <div className={'info_placeholder'} >
                                {user == undefined ? null :
                                    <div className={'user_name'} >
                                        {user.firstName} {user.lastName}
                                    </div>
                                }
                                <div className={'photo_name'} >
                                    {moment(photo.timestamp).format('DD.MM.YYYY HH:mm')}
                                </div>
                            </div>
                        </div>
                    )

                })}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       getUser: (userId) => {
           let {usersMap} = state.users;
           return usersMap.get(userId)
       },
       loading: state.users.loading || state.photos.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

PhotosList = connect(mapStateToProps, mapDispatchToProps)(PhotosList)

export default PhotosList