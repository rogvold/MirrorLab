/**
 * Created by sabir on 13.11.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var Select = require('react-select');

var YearPickerPanel = React.createClass({
    getDefaultProps: function () {
        return {

            yearsNumber: 100,

            year: undefined,


            onChange: function(y){

            }


        }
    },

    getInitialState: function () {
        return {
            value: this.props.year
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.year
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    getYearsOptions: function(){
        var nowYear = +moment().format('YYYY');
        var arr = [];
        for (var i = 0; i < this.props.yearsNumber; i++){
            var y = nowYear - i;
            arr.push({
                label: '' + y,
                value: y
            });
        }
        return arr;
    },

    onChange: function(a){
        this.props.onChange(a.value);
        this.setState({
            value: a.value
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'year_picker_panel'} >

                <Select
                    backspaceRemoves={false}
                    multi={false}
                    searchable={false}
                    clearable={false}
                    name={'form-field-name'}
                    value={this.state.value}
                    placeholder={'Год'}
                    options={this.getYearsOptions()}
                    onChange={this.onChange} />

            </div>
        );
    }

});

module.exports = YearPickerPanel;