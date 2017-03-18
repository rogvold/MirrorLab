/**
 * Created by sabir on 14.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FollowUserButton = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {

            friendId: undefined

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading,
            link: store.getFriendLink(this.props.friendId)
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


    isFriend: function(){
        var store = this.getFlux().store('UsersStore');
        return store.isMyFriend(this.props.friendId);
    },

    switchLink: function(){
        var link = this.state.link;
        var currentUserId = this.getFlux().store('UsersStore').getCurrentUserId();
        if (link != undefined){
            this.getFlux().actions.deleteUserLink(link.id);
        }else {
            this.getFlux().actions.createUserLink({creatorId: currentUserId, friendId: this.props.friendId});
        }
    },

    render: function(){
        console.log('FollowUserButton: render: link = ', this.state.link);

        var link = this.state.link;
        var isFriend = this.isFriend();

        var cl = 'follow_user_button ui mini basic button ';
        if (isFriend == false){
            cl = cl + ' add ';
        }
        console.log('isFriend = ', isFriend);

        return (
            <div className={cl} onClick={this.switchLink} >
                {isFriend == true ?
                    <span><i className={'icon checkmark'} > в друзьях</i></span> :
                    <span>
                        <i className={'icon add user'} ></i>
                        добавить
                    </span>
                }
            </div>
        );
    }

});

module.exports = FollowUserButton;