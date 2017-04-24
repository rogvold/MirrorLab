/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

import {Map} from 'immutable';

class MessagesList extends React.Component {

    static defaultProps = {
        messages: [],
        currentUserId: undefined,

        showDaysDivider: true

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

    getDays = () => {
        let {messages} = this.props;
        let timestamps = messages.reduce((map, message) => {
            let dayStart = +moment(message.timestamp).startOf('day');
            return map.set(dayStart, dayStart)
        }, Map()).toArray().sort((a, b) => {return (b.timestamp - a.timestamp)});
        let getMessagesByTimestamp = (t) => {
            let start = +moment(t).startOf('day');
            let end = +moment(t).endOf('day');
            return messages.filter((mess) => {
                return (mess.timestamp >= start && mess.timestamp < end)
            })
        }
        return timestamps.map((time, k) => {
            return {
                timestamp: time,
                messages: getMessagesByTimestamp(time)
            }
        })
    }

    render = () => {
        let {currentUserId} = this.props;
        let {showDaysDivider} = this.props;
        let days = this.getDays();
        console.log('MessagesList: days = ', days);

        return (
            <div className={'messages_days_list'} >

                {days.map((day, k) => {
                    let messages = day.messages;

                    return (
                        <div className={'day_item'} key={day.timestamp}  >

                            <div className={'day_name_placeholder'} >
                                <div className={'day_name'} >
                                    {moment(day.timestamp).format('D MMMM YYYY')}
                                </div>
                            </div>

                            <div className={'messages_list'} >

                                {messages.map((m, k) =>{
                                    let text = (m.content == undefined) ? '' : m.content;
                                    text = text.replace(/\n/g, '<br/>');
                                    let isFromMe = (currentUserId == m.fromId);

                                    return (
                                        <div className={'message_item  ' + (isFromMe == true ? ' my_message' : 'friend_message')} key={m.id} >

                                            <div className={'inner_placeholder'} >
                                                <div className={'date_placeholder'} >
                                                    <div className={'date'} >
                                                        {moment(m.timestamp).format('HH:mm')}
                                                    </div>
                                                </div>

                                                <div className={'text_placeholder'} >
                                                    <div className={'text'} >
                                                        <div dangerouslySetInnerHTML={{__html: text}} ></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                        </div>
                    )

                })}


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

//MessagesList = connect(mapStateToProps, mapDispatchToProps)(MessagesList)

export default MessagesList