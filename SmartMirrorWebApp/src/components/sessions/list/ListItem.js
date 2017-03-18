/**
 * Created by sabir on 24.01.2017.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {LineChart, Line, ResponsiveContainer} from 'recharts';

import moment from 'moment';

import SessionChartPanel from '../charts/SessionChartPanel.js'

import SessionDataPanel from '../panels/SessionDataPanel'



class ListItem extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        session: PropTypes.object.isRequired,
        onItemClick: PropTypes.func,
        expanded: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onClick = () => {
        this.props.onItemClick();
    }

    render() {

        let {expanded, session} = this.props;

        return (
            <div className={'item session_item' + (expanded == true ? ' expanded ' : '')} onClick={this.onClick} >
                <div className={'header'} >
                    <i className={'icon calendar'} ></i> {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                </div>

                <div className={'content'} >

                    {this.props.expanded != true ? null :
                        <div className={'extended_content'} >
                            <SessionDataPanel sessionId={session.id} />
                        </div>
                    }

                </div>
            </div>
        )
    }

}

export default ListItem