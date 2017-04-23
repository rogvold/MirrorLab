/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

class MessagesList extends React.Component {

    static defaultProps = {
        messages: []
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
        let {messages} = this.props;

        return (
            <div className={'messages_list'} >

                {messages.map((m, k) =>{
                    let text = m.text == undefined ? '' : m.text;
                    text = text.replace(/\n/g, '<br/>');
                    return (
                        <div className={'message_item'} key={m.id} >

                            <div className={'date_placeholder'} >
                                <div className={'date'} >
                                    {moment(m.timestamp).format('D MMM YYYY HH:mm')}
                                </div>
                            </div>

                            <div className={'text_placeholder'} >
                                <div className={'text'} >
                                    <div dangerouslySetInnerHTML={{__html: text}} ></div>
                                </div>
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