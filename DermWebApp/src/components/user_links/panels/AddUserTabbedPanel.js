/**

 */

var React = require('react');
var assign = require('object-assign');

// var CreateUserPanel = require('./CreateUserPanel');

// var SearchUsersPanel = require('../../search/users/SearchUsersPanel');

import CreateUserPanel from './CreateUserPanel'

var AddUserTabbedPanel = React.createClass({
    getDefaultProps: function () {
        return {

            onAdded: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            mode: 'create'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var mode = this.state.mode;

        return (
            <div style={this.componentStyle.placeholder} className={'add_user_tabbed_panel'} >

                {true == true ? null :
                    <div className={'tabs_placeholder ui top attached tabular menu'} >

                        <div className={'tab item ' + (mode == 'create' ? ' active ' : '') } onClick={this.setState.bind(this, {mode: 'create'})} >
                            Новый
                        </div>

                        <div className={'tab item ' + (mode == 'search' ? ' active ' : '') } onClick={this.setState.bind(this, {mode: 'search'})} >
                            Существующий
                        </div>

                    </div>
                }

                <div className={'active_tab_content ui bottom attached active tab segment'} >

                    {mode != 'create' ? null :
                        <CreateUserPanel onCreated={this.props.onAdded} />
                    }

                    {mode != 'search' ? null :
                        <div>
                            {'<SearchUsersPanel /> goes here'}
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = AddUserTabbedPanel;