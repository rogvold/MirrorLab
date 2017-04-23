/**

 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var UpdateUserWrapper = require('../buttons/UpdateUserWrapper');

var UsersList = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            users: [],

            onUserClick: function(u){

            }

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        moment.lang('ru');
    },

    componentStyle: {
        placeholder: {}
    },

    getLink: function(userId){
        var link = this.getFlux().store('UsersStore').getFriendLink(userId);
        return link;
    },

    render: function () {
        var list = this.props.users;
        var currentUserId = this.getFlux().store('UsersStore').getCurrentUserId();

        return (
            <div style={this.componentStyle.placeholder} className={'users_list'} >

                <div className={'user_row header_row'} >
                    <div className={'name'} >
                        Имя пользователя
                    </div>
                    <div className={'last_training'} >
                        Последняя тренировка
                    </div>
                    <div className={'controls'} >

                    </div>
                </div>

                {list.map(function(u, k){
                    var key = 'user_' + k + '_' + u.id;
                    var onClick = this.props.onUserClick.bind(this, u);
                    var link = this.getLink(u.id);

                    return (
                        <div className={'user_row'} key={key} >
                            <div className={'name'} onClick={onClick} >
                                {u.firstName} {u.lastName}
                            </div>
                            <div className={'last_training'} onClick={onClick} >
                                {u.lastTrainingTimestamp == undefined ?
                                    <span> - </span> :
                                    <span> {moment(u.lastTrainingTimestamp).format('DD.MM.YYYY')}
                                           <span className={'ago'} >({moment(u.lastTrainingTimestamp).fromNow()})</span>
                                    </span>
                                }

                            </div>
                            <div className={'controls'} >
                                <div className={'heart_placeholder'} >
                                    {link.creatorCanWrite == true ?
                                        <i className={'icon heart'} ></i> : <i className={'icon empty heart'} ></i>
                                    }
                                </div>
                                <div className={'edit_placeholder'} >
                                    {currentUserId != u.creatorId ? null :
                                        <UpdateUserWrapper userId={u.id}>
                                            <i className={'icon pencil'} ></i>
                                        </UpdateUserWrapper>
                                    }
                                </div>
                            </div>
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = UsersList;