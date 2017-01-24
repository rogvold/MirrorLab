/**
 * Created by sabir on 23.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FileUploadButton from '../../../upload/FileUploadButton'

import PimpledImage from '../../image/PimpledImage'

class UploadPhotoPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        data: {}
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onFileUploaded = (d) => {
        console.log('onFileUploaded: d = ', d);
        this.setState({
            data: d
        });
    }

    render = () => {
        let {data} = this.state;
        let spots = (data == undefined) ? [] : data.spots;


        return (
            <div className={'upload_photo_panel'} >

                {data == undefined ? null :
                    <div className={'photo_placeholder'}>
                        <PimpledImage src={data.filename} pimples={spots} />
                    </div>
                }

                <div className={'button_placeholder'} >

                    <FileUploadButton
                        onFileUploaded={this.onFileUploaded}
                    />

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

//UploadPhotoPanel = connect(mapStateToProps, mapDispatchToProps)(UploadPhotoPanel)

export default UploadPhotoPanel