/**
 * Created by sabir on 06.11.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');

var FriendInfoPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            topRightContent: undefined

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

    render: function(){
        var user = this.state.user;
        if (user == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} className={'friend_info_panel'} >

                <div className={'top_content'} >
                    <div className={'name_placeholder'} >
                        {user.firstName} {user.lastName}
                    </div>
                    {this.props.topRightContent == undefined ? null :
                        <div className={'top_right_content'} >
                            {this.props.topRightContent}
                        </div>
                    }
                </div>

                <div className={'content_placeholder'} >

                    <div>
                        <div className={'field_name'} >Отображаемое имя:</div>
                        <div className={'field_value'} >{user.nickname}</div>
                    </div>

                    <div>
                        <div className={'field_name'} >Дата рождения:</div>
                        <div className={'field_value'} >{moment(user.birthdayTimestamp).format('DD.MM.YYYY')} ({Math.floor(moment(new Date()).diff(moment(user.birthdayTimestamp),'years',true))} г.)</div>
                    </div>

                    <div>
                        <div className={'field_name'} >E-mail:</div>
                        <div className={'field_value'} >{user.email}</div>
                    </div>

                    <div>
                        <div className={'field_name'} >Телефон:</div>
                        <div className={'field_value'} >{user.phone}</div>
                    </div>

                    <div>
                        <div className={'field_name'} >Дата регистрации:</div>
                        <div className={'field_value'} >{moment(user.timestamp).format('DD.MM.YYYY')}</div>
                    </div>

                </div>


            </div>
        );
    }

});

module.exports = FriendInfoPanel;