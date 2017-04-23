/**

 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UpdateAboutForm extends React.Component {

    static defaultProps = {
        about: '',
        onChange: (ab) => {
            console.log('default: onChange: ab = ', ab);
        }
    }

    static propTypes = {}

    state = {
        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.state = {about: props.about}
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        this.setState({
            about: newProps.about
        });
    }

    onSubmit = () => {
        this.props.onChange(this.state.about).then(() => {
            this.setState({
                changed: false
            });
        })
    }

    render = () => {
        let {about, changed} = this.state;

        return (
            <div className={'update_about_form'} >

                <div className={'ui form'} >
                    <div className={'field'} >
                        <div className={'prompt'}>
                            Здесь вы можете делать пометки об этом пациенте
                        </div>
                        <textarea value={about}
                                  placeholder={'О пациенте'}
                                  onChange={(evt) => {this.setState({about: evt.target.value, changed: true})}} ></textarea>
                    </div>

                    <div className={'button_placeholder'} >
                        <button className={'ui primary button'} onClick={this.onSubmit} disabled={!changed} >
                            <i className={'icon save'} style={{marginRight: 6, marginLeft: 0}} ></i> Сохранить
                        </button>
                    </div>
                </div>

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//UpdateAboutForm = connect(mapStateToProps, mapDispatchToProps)(UpdateAboutForm)

export default UpdateAboutForm