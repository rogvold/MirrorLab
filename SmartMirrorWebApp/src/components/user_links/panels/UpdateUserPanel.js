/**
 * Created by sabir on 15.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var UpdateUserForm = require('../forms/UpdateUserForm');

var UpdateUserPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading,
            user: store.getUser(this.props.userId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    onSubmit: function(data){
        console.log('UpdateUserPanel: onSubmit: data = ', data);
        if (data != undefined){
            data.id = this.props.userId;
        }
        this.getFlux().actions.updateUser(data);
    },

    render: function(){
        var user = this.state.user;
        if (user == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} className={'update_user_panel'} >

                <UpdateUserForm
                                firstName={user.firstName}
                                lastName={user.lastName}
                                nickname={user.nickname}
                                birthdayTimestamp={user.birthdayTimestamp}
                                gender={user.gender}
                                email={user.email}
                                password={user.password}
                                onSubmit={this.onSubmit}
                                showNickname={true}
                                buttonName={'Обновить'}
                    />

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdateUserPanel;