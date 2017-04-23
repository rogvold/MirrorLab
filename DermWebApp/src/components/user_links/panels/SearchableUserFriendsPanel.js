/**

 */

var React = require('react');
var assign = require('object-assign');

var UserFriendsPanel = require('./UserFriendsPanel');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchableUserFriendsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function () {
        return {}
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading
        }
    },

    getInitialState: function () {
        return {
            text: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onTextChange: function(evt){
        this.setState({
            text: evt.target.value
        });
    },


    getUsersNumber: function(){
        var store = this.getFlux().store('UsersStore');
        var friendsLinks = store.getFriendsLinks();
        if (friendsLinks == undefined){
            return 0;
        }
        return friendsLinks.length;
    },

    render: function () {
        console.log('SearchableUserFriendsPanel: text = ', this.state.text);

        return (
            <div style={this.componentStyle.placeholder} className={'searchable_user_friends_panel'} >

                <div className={'head'} >
                    <div className={'ui grid'} >
                        <div className={'eight wide column'} >
                            <div className={'h2'} >
                                Пользователи
                                {this.state.loading == true ? null :
                                    <span className={'total_users_number'} > ({this.getUsersNumber()}) </span>
                                }
                            </div>
                        </div>
                        <div className={'eight wide column'} >
                            <div className={'ui form'} >
                                <div className={'ui icon input'} >
                                    <input value={this.state.text} placeholder={'Поиск по имени'} onChange={this.onTextChange} />
                                    <i className="search icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <UserFriendsPanel filterText={this.state.text} />

            </div>
        );
    }

});

module.exports = SearchableUserFriendsPanel;