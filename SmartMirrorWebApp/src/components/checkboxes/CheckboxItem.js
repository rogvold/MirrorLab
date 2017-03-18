/**
 * Created by sabir on 06.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var CheckboxItem = React.createClass({
    getDefaultProps: function () {
        return {

            name: 'default name',
            isChecked: false,

            onCheckboxClick: function(){
                console.log('onCheckboxClick occured');
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
            marginBottom: 15
        }
    },

    onClick: function(){
        console.log('checkbox was clicked');
        this.props.onCheckboxClick();
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder,{cursor: (this.props.isChecked == true) ? 'default' : 'pointer'});

        return (
            <div style={st} >

                <span onClick={this.onClick} >
                    {this.props.isChecked ?
                        <i className={'icon checkmark box'} ></i> :
                        <i className={'icon square outline'} ></i>
                    }

                    {this.props.name}

                </span>


            </div>
        );
    }

});

module.exports = CheckboxItem;