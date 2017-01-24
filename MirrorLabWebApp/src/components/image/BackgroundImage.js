/**
 * Created by sabir on 11.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class BackgroundImage extends React.Component {

    static defaultProps = {
        image: 'https://t3.ftcdn.net/jpg/00/90/79/28/240_F_90792887_tVqJSA2eI5lFO9qFcJhPlhICH3noVArF.jpg',
        hasOverlay: false
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
        let {image, hasOverlay} = this.props;

        return (
            <div className={'background_image_placeholder'} >
                {hasOverlay == false ? null :
                    <div className={'overlay'} ></div>
                }
                <div className={'background'} style={{backgroundImage: 'url(" ' + image + '")'}} ></div>
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

//BackgroundImage = connect(mapStateToProps, mapDispatchToProps)(BackgroundImage)

export default BackgroundImage