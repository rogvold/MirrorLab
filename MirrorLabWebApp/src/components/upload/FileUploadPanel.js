/**
 * Created by sabir on 22.08.16.
 */

var React = require('react');
var assign = require('object-assign');

// var XHRHelper = require('../../helpers/XHRHelper');
import XHRHelper from '../../helpers/XHRHelper'
import SkinryHelper from '../../helpers/SkinryHelper'

import CoolPreloader from '../preloader/CoolPreloader'

var FileUploadPanel = React.createClass({
    getDefaultProps: function () {
        return {

            inputEnabled: false,

            onFileUploaded: function(d){
                console.log('uploaded: d = ', d);
            },

            isSkinry: true

        }
    },

    getInitialState: function () {
        return {
            file: undefined,
            loading: false,
            progress: 0,
            uploadedUrl: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {
            textAlign: 'center',
            backgroundColor: 'lightgoldenrodyellow',
            border: '1px solid lightgrey',
            borderRadius: 4
        },

        topPlaceholder: {
            textAlign: 'center'
        },

        submitPlaceholder: {
            textAlign: 'center',
            marginTop: 10
        }


    },

    onChange: function(event){
        var file = event.target.files[0];
        console.log('file = ', file);

        this.setState({
            file: event.target.files[0],
            uploadedUrl: undefined,
            loading: false,
            progress: 0
        });
    },

    getCuteSize: function(){
        var file = this.state.file;
        if (file == undefined){
            return '';
        }
        var size = Math.round(file.size * 10.0 / (1000 * 1000.0)) / 10.0
        return (size + ' MB');
    },

    onSubmit: function(){
        var file = this.state.file;
        this.setState({
            loading: true,
            progress: 0,
            uploadedUrl: undefined
        });
        let isSkinry = this.props.isSkinry;
        let uploadingFunction = (isSkinry == true) ? SkinryHelper.uploadSkinryPhoto : XHRHelper.uploadFile;

        uploadingFunction(file, function(d){
            this.props.onFileUploaded(d);
            this.setState({
                progress: 100,
                uploadedUrl: (isSkinry == true) ? d.url : d,
                loading: false
            });
        }.bind(this), function(e){
            this.setState({
                loading: false,
                uploadedUrl: undefined
            });
            alert('error occured during file uploading');
        }.bind(this), function(p){
            this.setState({
                loading: true,
                progress: p,
                uploadedUrl: undefined
            });
        }.bind(this));
    },

    onCustomSubmit: function(){
        var url = this.state.customUrl;
        this.props.onFileUploaded(url);
    },

    onCustomUrlChange: function(evt){
        this.setState({
            customUrl: evt.target.value
        });
    },

    render: function () {
        var file = this.state.file;
        var isImage = (file == undefined) ? false : (file.type.indexOf('image') != -1);
        var isVideo = (file == undefined) ? false : (file.type.indexOf('video') != -1);
        let loading = this.state.loading;

        return (
            <div style={this.componentStyle.placeholder}>



                {file == undefined ? null :
                    <div style={this.componentStyle.topPlaceholder}>

                        <div style={{textAlign: 'center', height: 50, lineHeight: '50px', fontSize: 50, marginBottom: 10}} >
                            {isImage == false ? null :
                                <i className={'icon file image outline'} ></i>
                            }
                            {isVideo == false ? null :
                                <i className={'icon file video outline'} ></i>
                            }
                        </div>

                        {file.name} <span style={{opacity: 0.5}} >({this.getCuteSize()})</span>

                    </div>
                }

                <div style={this.componentStyle.formPlaceholder}>
                    <div className={'ui form'} ref={'fInput'} >
                        <input type={'file'} onChange={this.onChange} />
                    </div>
                </div>

                {(file == undefined || this.state.uploadedUrl != undefined) ? null :
                    <div style={this.componentStyle.submitPlaceholder}>
                        <button className={'ui patientPrimary upload button'} onClick={this.onSubmit} >
                            <i className={'icon cloud upload'} ></i> Upload
                        </button>
                    </div>
                }

                {this.state.loading == false ? null :
                    <div className="ui progress success" style={{marginTop: 5, marginBottom: 5}} >

                        {this.state.progress == 100 ? null :
                            <div className="bar" style={{transitionDuration: '300ms', width: this.state.progress + '%'}}>
                                <div className="progress">{this.state.progress}%</div>
                            </div>
                        }

                        {this.state.progress != 100 ? null :
                            <div className="label">Everything worked, your file is
                                <a style={{marginLeft: 4}} href={this.state.uploadedUrl} target={'_blank'} >ready</a>
                                .</div>
                        }

                    </div>
                }

                {this.props.inputEnabled == false ? null :
                    <div>
                        {file != undefined ? null :
                            <div style={{marginTop: 10}} >
                                <div style={{textAlign: 'center', padding: 10, marginBottom: 10}} >
                                    или
                                </div>
                                <div className={'ui form'} >
                                    <div className={'field'} >
                                        <label>
                                            Загрузить файл по ссылке
                                        </label>
                                        <div className={'ui action input'} >
                                            <input
                                                placeholder={'Прямая ссылка на файл'}
                                                type="text" onChange={this.onCustomUrlChange} value={this.state.customUrl} />
                                            <button className="ui teal button" onClick={this.onCustomSubmit} disabled={(this.state.customUrl == undefined || this.state.customUrl.trim() == '')} >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = FileUploadPanel;