/**
 * Created by sabir on 07.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ParseAPI from '../../../api/ParseAPI'

class UploadSampleDataPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        deviceCode: '',
        startTimestamp: +new Date(),
        channel1PointsString: '',
        channel2PointsString: '',
        loading: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getData = () => {
        return {
            startTimestamp: +this.state.startTimestamp,
            deviceCode: this.state.deviceCode,
            channel1Points: this.state.channel1PointsString.split('\n').map((p) => {return +p}),
            channel2Points: this.state.channel2PointsString.split('\n').map((p) => {return +p})
        }
    }

    canSubmit = () => {
        let data = this.getData();
        if (data.startTimestamp == undefined || data.deviceCode == undefined || data.deviceCode.trim() == ''
            || data.channel1Points == undefined || data.channel2Points == undefined || data.channel1Points.length != data.channel2Points.length
            || data.channel1Points.length == 0

        ){
            return false;
        }
        return true;
    }

    onSubmit = () => {
        let data = this.getData();
        let canSubmit = this.canSubmit();
        if (canSubmit == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ParseAPI.runCloudFunctionAsPromise("uploadData", data, ).then(
            () => {this.setState({loading: false});},
            (err) => {alert(err.message); this.setState({loading: false})}
        )
    }

    render = () => {
        let {deviceCode, channel2PointsString, channel1PointsString, startTimestamp} = this.state;
        let canSubmit = this.canSubmit();

        return (
            <div className={'upload_sample_data_panel'} >

                <div className={'ui form'} >
                    <div className={'field'} >
                        <label>
                            startTimestamp
                        </label>
                        <input placeholder={'deviceCode'} value={startTimestamp}  />
                    </div>
                    <div className={'field'} >
                        <label>
                            deviceCode
                        </label>
                        <input placeholder={'deviceCode'} value={deviceCode} onChange={(evt) => {this.setState({deviceCode: evt.target.value});}} />
                    </div>
                    <div className={'field'} >
                        <label>
                            channel1Points
                        </label>
                        <textarea placeholder={'channel1Points'} value={channel1PointsString} onChange={(evt) => {this.setState({channel1PointsString: evt.target.value});}} ></textarea>
                    </div>
                    <div className={'field'} >
                        <label>
                            channel2Points
                        </label>
                        <textarea placeholder={'channel2Points'} value={channel2PointsString} onChange={(evt) => {this.setState({channel2PointsString: evt.target.value});}} ></textarea>
                    </div>
                </div>

                <div className={'button_placeholder'} >
                    <button className={'ui primary fluid button'}
                            disabled={!canSubmit}
                            onClick={this.onSubmit} >
                        Submit
                    </button>
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

//UploadSampleDataPanel = connect(mapStateToProps, mapDispatchToProps)(UploadSampleDataPanel)

export default UploadSampleDataPanel