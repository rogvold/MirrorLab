/**
 * Created by sabir on 05.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UpdateSensorForm extends React.Component {

    static defaultProps = {
        deviceCode: '',
        onChange: (deviceCode) => {
            console.log('default: onChange: deviceCode = ', deviceCode);
        }
    }

    static propTypes = {}

    state = {
        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.state = {deviceCode: props.deviceCode}
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        this.setState({
            deviceCode: newProps.deviceCode
        });
    }

    onSubmit = () => {
        this.props.onChange(this.state.deviceCode).then(() => {
            this.setState({
                changed: false
            });
        })
    }

    render = () => {
        let {deviceCode, changed} = this.state;

        return (
            <div className={'update_about_form'} >

                <div className={'ui form'} >
                    <div className={'field'} >
                        <div className={'prompt'}>
                            Код устройства (написан в паспорте устройства)
                        </div>
                        <input value={deviceCode}
                                  placeholder={'Код устройства'}
                                  onChange={(evt) => {this.setState({deviceCode: evt.target.value, changed: true})}} />
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

//UpdateSensorForm = connect(mapStateToProps, mapDispatchToProps)(UpdateSensorForm)

export default UpdateSensorForm