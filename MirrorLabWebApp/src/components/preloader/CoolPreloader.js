/**
 * Created by sabir on 11.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CoolPreloader extends React.Component {

    static defaultProps = {
        text: 'Loading...'
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {text} = this.props;
        let isEmptyText = (text == undefined || text.trim() == '');

        return (
            <div className={'ui active inverted dimmer'} >
                {isEmptyText == true ?
                    <div className={'ui loader'}></div> :
                    <div className={'ui text loader'}>{text}</div>
                }
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

//CoolPreloader = connect(mapStateToProps, mapDispatchToProps)(CoolPreloader)

export default CoolPreloader