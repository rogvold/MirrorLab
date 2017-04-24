/**
 * Created by sabir on 24.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CalendarPanel from './CalendarPanel'

class PhotosCalendarPanel extends React.Component {

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

        return (
            <div className={'photos_calendar_panel'} >

                <CalendarPanel  />

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       photos: state.photos.photosMap.toArray()
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

PhotosCalendarPanel = connect(mapStateToProps, mapDispatchToProps)(PhotosCalendarPanel)

export default PhotosCalendarPanel