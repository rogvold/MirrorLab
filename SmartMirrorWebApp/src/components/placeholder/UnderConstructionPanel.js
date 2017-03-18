/**
 * Created by sabir on 06.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../constants/AccountsConstants'

class UnderConstructionPanel extends React.Component {

    static defaultProps = {
        text: 'Страница находится в разработке...'
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

        return (
            <div className={'no_sessions_panel'} >

                <div className={'no_sessions_img_placeholder'} >
                    <img className={'no_sessions_img'} src={constants.UNDER_CONSTRUCTION_IMAGE} />
                </div>
                <div className={'no_sessions_text'} >
                    {this.props.text}
                </div>


            </div>
        )
    }

}

export default UnderConstructionPanel