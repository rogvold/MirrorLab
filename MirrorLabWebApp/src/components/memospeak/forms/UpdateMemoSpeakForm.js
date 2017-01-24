import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FileUploadButton from '../../upload/FileUploadButton'

import ReactPlayer from 'react-player';

class UpdateMemoSpeakForm extends React.Component {

    static defaultProps = {
        onSubmit: (data) => {

        }
    }

    static propTypes = {}

    state = {
        transcript: undefined,
        comment: undefined,
        text: undefined,
        imageUrl: undefined,

        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    isEmpty = (s) => {
        return (s == undefined || s.trim() == '');
    }


    canSubmit = () => {
        let {changed, name, comment, transcript, imageUrl, url} = this.state;
        if (changed == false){
            return false;
        }
        console.log('canSubmit: changed, name, comment, transcript, imageUrl, url = ', changed, name, comment, transcript, imageUrl, url);
        let ie = this.isEmpty;
        if ( ie(name) == true || ie(transcript) == true || ie(url) == true || ie(imageUrl) == true){
            return false;
        }
        return true;
    }

    onSave = () => {
        let {imageUrl, comment, transcript, url, name} = this.state;
        if (this.canSubmit() == false){
            return;
        }
        this.props.onSubmit({imageUrl, comment, transcript, url, name});
    }

    render = () => {
        let {imageUrl, comment, transcript, url, name} = this.state;
        let canSubmit = this.canSubmit();

        return (
            <div className={'update_memo_speak_form'} >
                <div className="ui form" >

                    <div className={'field'} >
                        <label>Name</label>
                        <input placeholder={'Name'}
                               value={name}
                               onChange={(evt) => {this.setState({name: evt.target.value, changed: true})}} />
                    </div>

                    <div className={'field'} >
                        <label>Transcript</label>
                        <textarea placeholder={'Transcript'}
                                  value={transcript}
                                  onChange={(evt) => {this.setState({transcript: evt.target.value, changed: true})}} ></textarea>
                    </div>

                    <div className={'field'} >
                        <label>Comment</label>
                        <textarea placeholder={'Comment (optional)'}
                                  value={comment}
                                  onChange={(evt) => {this.setState({comment: evt.target.value, changed: true})}} ></textarea>
                    </div>

                    <div className={'ui grid'} >
                        <div className={'eight wide column'} >
                            <div className={'field'} >
                                <label>Image</label>
                                {imageUrl == undefined ? null :
                                    <div className={'width100percent'} >
                                        <img src={imageUrl} />
                                        <div className={'ui message red'} onClick={() => {this.setState({imageUrl: undefined, changed: true})}} >
                                            <i className={'icon remove'} ></i> delete image
                                        </div>
                                    </div>
                                }
                                {imageUrl != undefined ? null :
                                    <div>
                                        <FileUploadButton onFileUploaded={ (url) => {this.setState({imageUrl: url, changed: true})} } />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={'eight wide column'} >
                            <div className={'field'} >
                                <label>Video</label>
                                {url == undefined ? null :
                                    <div className={'width100percent'} >
                                        <ReactPlayer url={url} controls={true} className={'react-player'} />
                                        <div className={'ui message red'} onClick={() => {this.setState({url: undefined})}} >
                                            <i className={'icon remove'} ></i> delete video
                                        </div>
                                    </div>
                                }
                                {url != undefined ? null :
                                    <div>
                                        <FileUploadButton onFileUploaded={ (uploadedUrl) => {this.setState({url: uploadedUrl})} } />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                    <div className={'ui grid'} >
                        <div className={'ui sixteen wide column'} >
                            <button className={'ui button primary'} onClick={this.onSave} disabled={!canSubmit} >
                                <i className={'icon save'} ></i> Save
                            </button>
                        </div>
                    </div>

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

//UpdateMemoSpeakForm = connect(mapStateToProps, mapDispatchToProps)(UpdateMemoSpeakForm)

export default UpdateMemoSpeakForm