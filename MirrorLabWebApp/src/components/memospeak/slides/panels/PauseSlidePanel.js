/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PauseSlidePanel extends React.Component {

    static defaultProps = {
        pauseDuration: 2 * 1000,

        onEnded: () => {

        }

    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.props.onEnded();
        }, this.props.pauseDuration)
    }

    componentWillReceiveProps() {

    }


    componentWillUnmount = () => {
        if (this.intervalId != undefined){
            clearInterval(this.intervalId)
        }
    }

    render = () => {

        return (
            <div className={'pause_slide_panel'} >



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

//PauseSlidePanel = connect(mapStateToProps, mapDispatchToProps)(PauseSlidePanel)

export default PauseSlidePanel