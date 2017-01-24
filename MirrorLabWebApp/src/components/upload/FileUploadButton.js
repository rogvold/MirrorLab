/**
 * Created by sabir on 22.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var FileUploadPanel = require('./FileUploadPanel');

var FileUploadButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonName: 'Upload file',
            buttonClassName: 'ui basic button',
            icon: 'icon cloud upload',

            inputEnabled: false,

            style: {},

            level: 1000,

            onFileUploaded: function(d){

            },

            isSkinry: true


        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 620,
            padding: 10
        }

    },

    onFileUploaded: function(url){
        this.props.onFileUploaded(url);
        this.onClose();
    },

    getContent: function () {
        return (
            <div>
                <FileUploadPanel
                    isSkinry={this.props.isSkinry}
                    inputEnabled={this.props.inputEnabled} onFileUploaded={this.onFileUploaded} />
            </div>
        );
    },

    onClose: function () {
        this.setState({
            dialogVisible: false
        });
    },

    show: function () {
        console.log('show dialog occured');
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} onClick={this.show} className={this.props.buttonClassName}>
                    {(this.props.icon == undefined || this.props.icon == '') ? null :
                        <i className={this.props.icon}></i>
                    }

                    {this.props.buttonName}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={content} level={this.props.level} onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            visible={true}
                        />
                }

            </div>
        );
    }

});

module.exports = FileUploadButton;