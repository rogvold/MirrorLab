/**
 * Created by sabir on 08.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from '../dialog/Dialog'

import UploadImagePanel from './UploadImagePanel'

class UploadImageWrapper extends React.Component {

    static defaultProps = {
        onImageUploaded: (url) => {

        }
    }

    static propTypes = {}

    state = {
        visible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onImageUploaded = (url) => {
        console.log('Wrapper: onImageUploaded: url = ', url);
        this.props.onImageUploaded(url);
        setTimeout(() => {
            this.setState({visible: false});
        }, 10)


    }

    render = () => {
        let {visible} = this.state;

        return (
            <div className={'upload_image_wrapper'}>

                <span onClick={() => {this.setState({visible: true});}} >
                    {this.props.children}
                </span>


                {visible == false ? null :
                    <Dialog onClose={() => {this.setState({visible: false});}} level={10000000} >
                        <UploadImagePanel onImageUploaded={this.onImageUploaded} />
                    </Dialog>
                }



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

//UploadImageWrapper = connect(mapStateToProps, mapDispatchToProps)(UploadImageWrapper)

export default UploadImageWrapper