/**
 * Created by sabir on 24.01.2017.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListItem from './ListItem.js'

import moment from 'moment';

import FlipMove from 'react-flip-move';

class SessionsList extends React.Component {

    static defaultProps = {
        sessions: []
    }

    static propTypes = {
        onItemClick: PropTypes.func,
        selectedSessionId: PropTypes.string
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

    onItemClick = (item) => {
        this.props.onItemClick(item);
    }

    render() {
        let list = this.props.sessions;

        return (
            <div className={'sessions_list'} >
                <FlipMove easing="cubic-bezier(0.39, 0, 0.45, 1.4)" staggerDurationBy={60} duration={300} >
                    {list.map((item, k) => {
                        var key = 'session_item_' + k + '_' + item.id;
                        var onItemClick = this.onItemClick.bind(this, item);
                        var isSelected = (item.id == this.props.selectedSessionId);
                        return (
                            <div className={'session_item ' + (isSelected == true ? ' selected ' : '' )} key={key} onClick={onItemClick} >
                                <div className={'header'} >
                                    <i className={'icon calendar'} ></i>
                                    {moment(item.timestamp).format('DD.MM.YYYY HH:mm')}
                                </div>
                            </div>
                        );
                    }, this)}
                </FlipMove>
            </div>
        )
    }

}

export default SessionsList