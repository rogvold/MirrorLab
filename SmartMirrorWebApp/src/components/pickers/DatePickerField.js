/**
 * Created by sabir on 14.11.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var DatePickerPanel = require('./panels/DatePickerPanel');

var Dialog = require('../dialog/Dialog');

var DatePickerField = React.createClass({
    getDefaultProps: function () {
        return {

            timestamp: undefined,
            onChange: function(){

            },

            label: undefined,

            dateFormat: 'DD.MM.YYYY',

            placeholder: '',

            //buttonClassName: 'ui blue right labeled icon button'
            buttonClassName: 'ui right labeled icon button'


        }
    },

    getInitialState: function () {
        return {
            timestamp: this.props.timestamp,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            timestamp: nextProps.timestamp
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        }
    },

    onChange: function(t){
        this.props.onChange(t);
        this.setState({
            timestamp: t,
            dialogVisible: false
        });
    },

    getDialogContent: function(){
        return (
            <div className={'date_picker_panel_placeholder'} >
                {'<DatePickerPanel timestamp={this.state.timestamp} onChange={this.onChange} />'}
            </div>
        );
    },

    render: function () {
        var text = (this.state.timestamp == undefined) ? '' : moment(this.state.timestamp).format(this.props.dateFormat);

        return (
            <div style={this.componentStyle.placeholder} className={'field'} >

                {this.props.label == undefined ? null :
                    <label>{this.props.label}</label>
                }

                <div className={'ui action input'} >

                    <input value={text} placeholder={this.props.placeholder} style={{opacity: 1}} disabled={true} />

                    <button className={this.props.buttonClassName}
                            onClick={this.setState.bind(this, {dialogVisible: true})} >
                        <i className="calendar icon"></i>
                        выбрать
                    </button>

                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        level={100000}
                        dialogPanelClassName={'date_picker_dialog'}
                        onClose={this.setState.bind(this, {dialogVisible: false})}
                    >
                        {this.getDialogContent()}
                    </Dialog>
                }

            </div>
        );
    }

});

module.exports = DatePickerField;