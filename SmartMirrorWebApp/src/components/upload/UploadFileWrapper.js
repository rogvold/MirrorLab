/**
 * Created by sabir on 02.03.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from '../dialog/Dialog'

import UploadFilePanel from './UploadFilePanel'

class UploadFileWrapper extends React.Component {

    static defaultProps = {
        onFileUploaded: (url) => {

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

    onFileUploaded = (url) => {
        console.log('Wrapper: onFileUploaded: url = ', url);
        this.props.onFileUploaded(url);
        setTimeout(() => {
            this.setState({visible: false});
        }, 10)
    }

    render = () => {
        let {visible} = this.state;

        return (
            <div className={'upload_file_wrapper'}>

                <span onClick={() => {this.setState({visible: true});}} >
                    {this.props.children}
                </span>


                {visible == false ? null :
                    <Dialog onClose={() => {this.setState({visible: false});}} level={10000000} >
                        <UploadFilePanel onFileUploaded={this.onFileUploaded} />
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

//UploadFileWrapper = connect(mapStateToProps, mapDispatchToProps)(UploadFileWrapper)

export default UploadFileWrapper