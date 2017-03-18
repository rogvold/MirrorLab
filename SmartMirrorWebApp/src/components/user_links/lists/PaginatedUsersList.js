/**
 * Created by sabir on 14.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var UsersList = require('./UsersList');

var PaginatedUsersList = React.createClass({
    getDefaultProps: function () {
        return {

            users: [],
            pageSize: 10,

            bottomLeftContent: undefined,

            onUserClick: function(u){

            }

        }
    },

    getInitialState: function () {
        return {
            currentPage: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onNext: function(){
        var users = this.props.users;
        var currentPage = this.state.currentPage;
        currentPage = Math.min(currentPage + 1,  Math.floor(users.length / this.props.pageSize) );
        this.setState({
            currentPage: currentPage
        });
    },

    onPrev: function(){
        var users = this.props.users;
        var currentPage = this.state.currentPage;
        currentPage = Math.max(currentPage -1, 0);
        this.setState({
            currentPage: currentPage
        });
    },

    getUsers: function(){
        var currentPage = this.state.currentPage;
        var pageSize = this.props.pageSize;
        var users = this.props.users;
        users = users.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
        return users;
    },

    getMaxPageNumber: function(){
        var users = this.props.users;
        return (Math.ceil(users.length / this.props.pageSize));
    },



    render: function () {
        var users = this.getUsers();
        var maxPageNumber = this.getMaxPageNumber();

        return (
            <div style={this.componentStyle.placeholder} className={'paged_users_list'} >

                <UsersList users={users} onUserClick={this.props.onUserClick} />


                <div className={'paged_users_list_controls_placeholder ui grid'} >

                    <div className={'eight wide column'} >
                        {this.props.bottomLeftContent == undefined ? null :
                            this.props.bottomLeftContent
                        }
                    </div>

                    <div className={'eight wide column '} >
                        {maxPageNumber < 2 ? null :
                            <div className={'pagination_controls'} >
                                <div className="ui right floated pagination menu">
                                    <span className="icon item pos_button " onClick={this.onPrev} >
                                        <i className="left chevron icon"></i>
                                    </span>
                                    <span className="item">
                                        {this.state.currentPage*this.props.pageSize + 1}
                                        -
                                        {Math.min((+this.state.currentPage + 1)*this.props.pageSize, this.props.users.length)}
                                        <span style={{marginLeft: 4}} >из {this.props.users.length}</span>
                                    </span>
                                    <span className=" icon item pos_button  " onClick={this.onNext} >
                                        <i className="right chevron icon"></i>
                                    </span>
                                </div>
                            </div>
                        }
                    </div>

                </div>



            </div>
        );
    }

});

module.exports = PaginatedUsersList;