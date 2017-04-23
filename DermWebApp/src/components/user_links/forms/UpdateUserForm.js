/**

 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var UpdateUserForm = React.createClass({
    getDefaultProps: function () {
        return {

            firstName: '',
            lastName: '',
            birthdayTimestamp: undefined,
            gender: undefined,
            nickname: '',

            email: undefined,
            password: undefined,

            buttonName: 'Создать',
            showNickname: false,

            errorContent: undefined,

            showAuthFields: true,

            onSubmit: function(data){
                console.log('UpdateUserForm: onSubmit: data = ', data);
            }


        }
    },

    getInitialState: function () {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            birthdayTimestamp: this.props.birthdayTimestamp,
            gender: this.props.gender,
            email: this.props.email,
            password: this.props.password,
            nickname: this.props.nickname,
            birthdayString: moment(this.props.birthdayTimestamp).format('DD.MM.YYYY')
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },



    onLastNameChange: function(evt){
        this.setState({
            changed: true,
            lastName: evt.target.value
        });
    },

    onFirstNameChange: function(evt){
        this.setState({
            firstName: evt.target.value,
            changed: true
        });
    },

    onBirthdayChange: function(t){
        this.setState({
            birthdayTimestamp: t,
            changed: true
        });
    },

    getData: function(){
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthdayTimestamp: this.state.birthdayTimestamp,
            gender: this.state.gender,
            nickname: this.state.nickname,
            email: this.state.email,
            password: this.state.password
        }
    },

    canSubmit: function(){
        var data = this.getData();
        if (data.firstName == undefined || data.firstName.trim() == '' ||
            data.lastName == undefined || data.lastName.trim() == '' ||
            data.gender == undefined
        ){
            return false;
        }
        return true;
    },

    onEmailChange: function(evt){
        this.setState({
            email: evt.target.value,
            changed: true
        });
    },

    onNicknameChange: function(evt){
        this.setState({
            nickname: evt.target.value,
            changed: true
        });
    },

    onPasswordChange: function(evt){
        this.setState({
            password: evt.target.value,
            changed: true
        });
    },

    onSubmit: function(){
        var data = this.getData();
        this.props.onSubmit(data);
    },

    render: function () {
        var canSubmit = this.canSubmit();
        var gender = this.state.gender;

        return (
            <div style={this.componentStyle.placeholder} className={'update_user_form'} >

                <div className={'ui form'} >

                    <div className={'field'} >
                        <label>Имя</label>
                        <input value={this.state.firstName} placeholder={'Имя'} onChange={this.onFirstNameChange} />
                    </div>

                    <div className={'field'} >
                        <label>Фамилия</label>
                        <input value={this.state.lastName} placeholder={'Фамилия'} onChange={this.onLastNameChange} />
                    </div>

                    <div className={'field'} >
                        <label>Пол</label>
                        <div className={'ui fluid buttons'} >
                            <div className={' ui button ' + (gender == 'male' ? ' active  ' : ' basic grey ')} onClick={this.setState.bind(this, {changed: true, gender: 'male'})} >
                                Мужской
                            </div>
                            <div className={' ui button ' + (gender == 'female' ? ' active  ' : ' basic grey ')} onClick={this.setState.bind(this, {changed: true, gender: 'female'})} >
                                Женский
                            </div>
                        </div>
                    </div>

                    {this.props.showNickname == false ? null :
                        <div className={'field'} >
                            <label>Отображаемое имя</label>
                            <input value={this.state.nickname} placeholder={'Отображаемое имя'} onChange={this.onNicknameChange} />
                        </div>
                    }

                    {this.props.showAuthFields == false ? null :
                        <div className={'field'} >
                            <label>Email</label>
                            <input value={this.state.email} placeholder={'Email'} onChange={this.onEmailChange} />
                        </div>
                    }

                    {this.props.showAuthFields == false ? null :
                        <div className={'field'}>
                            <label>Пароль</label>
                            <input value={this.state.password} placeholder={'Пароль'} onChange={this.onPasswordChange}/>
                        </div>
                    }

                    {this.props.errorContent == undefined ? null :
                        <div className={'field'} >
                            <div className={'ui red message'} >
                                {this.props.errorContent}
                            </div>
                        </div>
                    }

                    <div className={'field'} >
                        <div className={'submit_button_placeholder'} >
                            <button className={'ui primary fluid button'} disabled={!canSubmit} onClick={this.onSubmit} >
                                {this.props.buttonName}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = UpdateUserForm;