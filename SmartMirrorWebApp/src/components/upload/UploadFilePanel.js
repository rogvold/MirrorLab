/**
 * Created by sabir on 02.03.17.
 */


import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions/FileUploadActions'

import CoolPreloader from '../preloader/CoolPreloader'

class UploadFilePanel extends React.Component {

    static defaultProps = {
        onFileUploaded: (url) => {

        }
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

    onChange = (evt) => {
        let file = evt.target.value;
        let {onFileUploaded} = this.props;
        this.props.uploadFile(evt.target.files[0]).then((a) => {
            console.log('file uploaded: a = ', a);
            // let {image} = a;
            // let imageUrl = image.mini_url;
            let url = a.file.url;
            onFileUploaded(url);
        }, () => {
            alert('Ошибка при загрузкe файла. Попробуйте снова.');
        });
    }


    render = () => {

        return (
            <div className={'upload_image_panel'} >

                <div className={'info_text'} >
                    Выберите файл на компьютере.
                </div>

                <input type="file" onChange={this.onChange} />

                {this.props.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        loading: state.upload.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (file) => {
            return dispatch(actions.uploadFile(file))
        }
    }
}

UploadFilePanel = connect(mapStateToProps, mapDispatchToProps)(UploadFilePanel)

export default UploadFilePanel