/**
 * Created by sabir on 21.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PhotosList from './PhotosList'

class PagedPhotosList extends React.Component {

    static defaultProps = {
        photos: [],
        pageSize: 9
    }

    static propTypes = {}

    state = {
        page: 0
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPhotos = () => {
        let {photos, pageSize} = this.props;
        let {page} = this.state;
        let from = page * pageSize;
        let to = (page + 1) * pageSize;
        let pts = photos.slice(from, to)
        return pts;
    }

    getPaginationComponent = () => {
        let {pageSize, photos} = this.props;
        let {page} = this.state;
        let k = (photos == undefined) ? 0 : photos.length;
        let n = Math.ceil(1.0 * k / pageSize)
        let arr = [];
        for (var i = 0; i < n; i++){
            arr.push(i);
        }
        return arr.map((a) => {
            let key = a + '_' + 'key';
            let b = +a + 1;
            let cl = 'page_item ';
            if (page == a){
                cl = cl + 'selected';
            }

            return (
                <div className={cl} key={key} onClick={() => {this.setState({page: a})}}  >
                    {b}
                </div>
            )
        })
    }

    render = () => {
        let pts = this.getPhotos();

        return (
            <div className={'paged_photos'} >

                <div className={'list_placeholder'} >
                    <PhotosList
                        onPhotoEditOpen={this.props.onPhotoEditOpen}
                        onPhotoClick={this.props.onPhotoClick}
                        photos={pts} />
                </div>

                <div className={'pagination_placeholder'} >
                    {this.getPaginationComponent()}
                </div>

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

//PagedPhotosList = connect(mapStateToProps, mapDispatchToProps)(PagedPhotosList)

export default PagedPhotosList