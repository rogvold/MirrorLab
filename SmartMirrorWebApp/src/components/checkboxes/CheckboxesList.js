/**
 * Created by sabir on 06.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var CheckboxItem = require('./CheckboxItem');

var CheckboxesList = React.createClass({
    getDefaultProps: function () {
        return {

            checkboxes: [],

            checkedNumbers: [],

            onChange: function(newCheckedNumbers){

            }

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        }
    },

    isChecked: function(n){
        var numbers = this.props.checkedNumbers;
        for (var i in numbers){
            var k = numbers[i];
            if (n == k){
                return true;
            }
        }
        return false;
    },

    onCheckboxClick: function(clickedNumber){
        console.log('onCheckboxClick: clickedNumber = ', clickedNumber);

        var checkedNumbers = this.props.checkedNumbers;

        var wasChecked = this.isChecked(clickedNumber);

        console.log('wasChecked = ', wasChecked);

        if (wasChecked == true){
            checkedNumbers = checkedNumbers.filter(function(p){
                return (p != clickedNumber)
            });
        }else {
            checkedNumbers.push(clickedNumber);
        }
        this.props.onChange(checkedNumbers);
    },

    render: function () {
        var list = this.props.checkboxes;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(c, k){
                    var key = 'ch_' + k + '_' + c.name;
                    var isChecked = this.isChecked(k);
                    var onCheckboxClick = this.onCheckboxClick.bind(this, k);

                    return (
                        <CheckboxItem key={key}
                                      onCheckboxClick={onCheckboxClick}
                                      isChecked={isChecked} name={c.name} />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = CheckboxesList;