/**
 * Created by sabir on 14.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var UsersList = require('../lists/UsersList');
var PaginatedUsersList = require('../lists/PaginatedUsersList');

var AddUserButton = require('../buttons/AddUserButton');

var Dialog = require('../../dialog/Dialog');

var UserSessionsPanel = require('../../sessions/UserSessionsPanel');

var FriendInfoPanel = require('./info/FriendInfoPanel');

var UserFriendsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {

            filterText: undefined

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading,
            friendsLinks: store.getFriendsLinks()
        }
    },

    getInitialState: function(){
        return {
            selectedUser: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        setTimeout(function(){
            this.getFlux().actions.loadUserLinks(this.getFlux().store('UsersStore').getCurrentUserId());
        }.bind(this), 10);
    },

    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            padding: 10,
            width: 980
        }
    },

    getFriends: function(){
        var filterText = this.props.filterText;
        console.log('getFriends: filterText = ', filterText);

        var links = this.state.friendsLinks;
        var users = links.map(function(l){return l.friend});
        if (filterText == undefined || filterText.trim().length == 0){
            return users;
        }
        var arr = [];
        console.log('filtering');
        for (var i in users){
            var u = users[i];
            if (u.lastName.toLowerCase().indexOf(filterText.toLowerCase()) > -1 || u.firstName.toLowerCase().indexOf(filterText.toLowerCase()) > -1){
                arr.push(u);
                continue;
            }
            if ((u.email != undefined) && (u.email.indexOf(filterText) > -1)){
                arr.push(u);
                continue;
            }
        }
        console.log('getFriends: returning arr = ', arr);
        return arr;
    },

    onUserClick: function(u){
        this.setState({
            selectedUser: u
        });
    },

    doUnfriend: function(){
        var user = this.state.selectedUser;
        if (user == undefined){
            return null;
        }
        var link = this.getFlux().store('UsersStore').getFriendLink(user.id);
        if (link == undefined){
            return;
        }
        this.getFlux().actions.deleteUserLink({id: link.id}, function(){
            console.log('unfriended!!!');
            this.setState({
                selectedUser: undefined
            });
        }.bind(this));
    },

    getUnfriendButtonContent: function(){
        return (
            <div>
                <button className={'ui button red basic'} onClick={this.doUnfriend} >
                    <i className={'icon remove'} ></i> Удалить из списка
                </button>
            </div>
        );
    },

    getSelectedUserContent: function(){
        var user = this.state.selectedUser;
        if (user == undefined){
            return null;
        }
        return (
            <div className={'friend_dialog_placeholder'} >

                <div className={'dialog_name'} >
                    Журнал тренировок пользователя
                </div>

                <div>
                    <FriendInfoPanel userId={user.id} topRightContent={this.getUnfriendButtonContent()} />
                </div>

                <UserSessionsPanel userId={user.id} />
            </div>
        );
    },

    onClose: function(){
        this.setState({
            selectedUser: undefined
        });
    },

    render: function(){
        var users = this.getFriends();
        console.log('UserFriendsPanel: render: users = ', users);

        return (
            <div style={this.componentStyle.placeholder} className={'user_friends_panel'} >

                <PaginatedUsersList
                    bottomLeftContent={<AddUserButton />}
                    users={users} onUserClick={this.onUserClick} />


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

                {this.state.selectedUser == undefined ? null :
                    <Dialog onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            content={this.getSelectedUserContent()} />
                }

            </div>
        );
    }

});

module.exports = UserFriendsPanel;