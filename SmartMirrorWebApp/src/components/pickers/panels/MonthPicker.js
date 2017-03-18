/**
 * Created by sabir on 13.11.16.
 */

var React = require('react');
var assign = require('object-assign');

var Select = require('react-select');

var MonthPicker = React.createClass({
    getDefaultProps: function () {
        return {

            month: undefined,

            onChange: function(m){

            }

        }
    },

    getInitialState: function () {
        return {
            value: this.props.month
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.month
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    getMonthsOptions: function(){
        return [
            {
            value: 1,
            label: 'Январь'
            },
            {
                value: 2,
                label: 'Февраль'
            },
            {
                value: 3,
                label: 'Март'
            },
            {
                value: 4,
                label: 'Апрель'
            },
            {
                value: 5,
                label: 'Май'
            },
            {
                value: 6,
                label: 'Июнь'
            },
            {
                value: 7,
                label: 'Июль'
            },
            {
                value: 8,
                label: 'Август'
            },
            {
                value: 9,
                label: 'Сентябрь'
            },
            {
                value: 10,
                label: 'Октябрь'
            },
            {
                value: 11,
                label: 'Ноябрь'
            },
            {
                value: 12,
                label: 'Декабрь'
            }];
    },

    onChange: function(a){
        this.props.onChange(a.value);
        this.setState({
            value: a.value
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'month_picker_panel'} >

                <Select
                    backspaceRemoves={false}
                    multi={false}
                    searchable={false}
                    clearable={false}
                    name={'form-field-name'}
                    value={this.state.value}
                    placeholder={'Год'}
                    options={this.getMonthsOptions()}
                    onChange={this.onChange} />

            </div>
        );
    }

});

module.exports = MonthPicker;