/**
 * Created by sabir on 13.11.16.
 */

var React = require('react');
var assign = require('object-assign');

var YearPickerPanel = require('./YearPickerPanel');
var MonthPicker = require('./MonthPicker');

var moment = require('moment');

var CalendarPanel = require('../../calendar/CalendarPanel');

var DatePickerPanel = React.createClass({
    getDefaultProps: function () {
        return {

            timestamp: undefined,

            onChange: function(t){

            }

        }
    },

    getInitialState: function () {
        return {
            timestamp: this.props.timestamp
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
        placeholder: {}
    },

    onYearChange: function(newYear){
        var t = +moment('' + newYear, 'YYYY').format('x');
        this.setState({
            timestamp: t
        });
    },

    onMonthChange: function(newMonth){
        this.setState({
            month: newMonth
        });
    },

    onDayClick: function(t){
        console.log('onDayClick: t = ', t);
        console.log('onDayClick: t = ', new Date(t));
        this.props.onChange(t);
        this.setState({
            timestamp: t
        });
    },

    render: function () {
        var m = +moment(this.state.timestamp).format('M');
        var y = +moment(this.state.timestamp).format('YYYY');

        var timestamp = (this.state.timestamp == undefined) ? (new Date()).getTime() : this.state.timestamp;

        return (
            <div style={this.componentStyle.placeholder} className={'date_picker_panel'} >

                <div className={'top_placeholder'} >

                    <YearPickerPanel year={y} onChange={this.onYearChange} />

                </div>

                <div className={'content_placeholder'} >

                    <CalendarPanel
                        onDayClick={this.onDayClick}
                        selectedTimestamp={timestamp}
                        hasTotalColumn={false} />

                </div>


            </div>
        );
    }

});

module.exports = DatePickerPanel;