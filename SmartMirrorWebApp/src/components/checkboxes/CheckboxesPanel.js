/**
 * Created by sabir on 06.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var CheckboxesList = require('./CheckboxesList');

var CheckboxesPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {

            checkboxes: [
                {
                    name: 'Apple',
                    isChecked: true
                }, {
                    name: 'Orange',
                    isChecked: false
                },
                {
                    name: 'Pear',
                    isChecked: true
                }],

            checkedNumbers: []

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 4,
            margin: '0 auto',
            width: 400,
            marginTop: 10
        },

        listPlaceholder: {

        },

        buttonPlaceholder: {
            marginTop: 10
        }

    },

    onChange: function(newCheckedNumbers){
        this.setState({
            checkedNumbers: newCheckedNumbers
        });
    },

    flush: function(){
        this.setState({
            checkedNumbers: []
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    <CheckboxesList checkedNumbers={this.state.checkedNumbers}
                                    onChange={this.onChange}
                                    checkboxes={this.state.checkboxes} />
                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui fluid button'} onClick={this.flush} >
                        <i className={'icon remove'} ></i>
                        flush checkboxes
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = CheckboxesPanel;