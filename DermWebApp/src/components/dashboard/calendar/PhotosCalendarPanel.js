/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PhotosList from '../list/PhotosList'

import CalendarPanel from '../../calendar/CalendarPanel'

import moment from 'moment';

class PhotosCalendarPanel extends React.Component {

    static defaultProps = {
        photos: [],
        onPhotoClick: (photo) => {

        }
    }

    static propTypes = {}

    state = {
        selectedTimestamp: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPhotosForDay = (timestamp) => {
        let start = +moment(timestamp).startOf('day');
        let end = +moment(timestamp).endOf('day');
        let {photos} = this.props;
        let arr = photos.filter((s) => {return (s.timestamp < end && s.timestamp > start)})
        return arr;
    }

    getSelectedContent = (timestamp) => {
        let {onPhotoClick} = this.props;
        let photos = this.getPhotosForDay(timestamp);
        return (
            <div className={'calendar_sessions_panel'} >
                <PhotosList photos={photos} onPhotoClick={(p) => {onPhotoClick(p)}} />
            </div>
        )
    }

    contentFunction = (timestamp) => {
        let photos = this.getPhotosForDay(timestamp);
        if (photos.length == 0){
            return null;
        }
        return (
            <div className={'calendar_spot'} >
                <div className={'calendar_inner'} >
                    {photos.length}
                </div>
            </div>
        );
    }

    onDaySelect = (t) => {
        let {selectedTimestamp} = this.state;
        if (this.getPhotosForDay(t).length == 0){
            return;
        }
        if (t == selectedTimestamp){
            t = undefined;
        }
        this.setState({
            selectedTimestamp: t
        });
    }

    render = () => {
        let {selectedTimestamp} = this.state;

        return (
            <div className={'photos_calendar_panel'} >

                <CalendarPanel
                    selectedTimestamp={selectedTimestamp}
                    onDayClick={this.onDaySelect}
                    selectedContentFunction={this.getSelectedContent}
                    contentFunction={this.contentFunction}
                />

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

//PhotosCalendarPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosCalendarPanel)

export default PhotosCalendarPanel