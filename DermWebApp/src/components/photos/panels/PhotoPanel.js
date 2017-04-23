/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

import CommentsPanel from '../../comments/panels/CommentsPanel'

class PhotoPanel extends React.Component {

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
        let {photo, user} = this.props;
        if (photo == undefined || user == undefined){
            return null;
        }

        return (
            <div className={'photo_panel'}>

                <div className={'name_placeholder'} >
                    <div className={'name'} >
                        {user == undefined ? null :
                            <span style={{marginLeft: 10, marginRight: 10}} >
                                {user.firstName} {user.lastName}
                            </span>
                        }

                        ({moment(photo.timestamp).format('D MMM YYYY HH:mm')})
                    </div>
                </div>

                <div className={'photo_placeholder'} >
                    <img src={photo.url} />
                </div>

                <div className={'comments_placeholder'} >
                    <CommentsPanel relatedId={photo.id} />
                </div>

            </div>
        )
    }

}

let getUser = (state, id) => {
    let photo = state.photos.photosMap.get(id);
    if (photo == undefined){
        return undefined;
    }
    return state.users.usersMap.get(photo.userId)
}

const mapStateToProps = (state, ownProps) => {
   return {
       photo: state.photos.photosMap.get(ownProps.id),
       user: getUser(state, ownProps.id)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

PhotoPanel = connect(mapStateToProps, mapDispatchToProps)(PhotoPanel)

export default PhotoPanel