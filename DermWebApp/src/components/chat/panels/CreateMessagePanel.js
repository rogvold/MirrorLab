/**
 * Created by sabir on 23.04.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import  * as chatActions from '../../../redux/actions/ChatActions'

class CreateMessagePanel extends React.Component {

    static defaultProps = {
        fromId: undefined,
        toId: undefined
    }

    static propTypes = {
        fromId: PropTypes.string.isRequired,
        toId: PropTypes.string.isRequired
    }

    state = {
        text: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {createMessage, fromId, toId} = this.props;
        let {text} = this.state;

        return (
            <div className={'create_message_panel'} >
                <div className={'ui form'} >
                    <div className="ui action input">
                        <textarea type="text"
                                  value={text}
                                  onChange={(evt) => {this.setState({text: evt.target.value})}}
                                  placeholder="Ваше сообщение" ></textarea>
                        <button className="ui button"
                                onClick={() => {
                                    createMessage({
                                        text: text,
                                        fromId: fromId,
                                        toId: toId
                                    }).then(
                                        () => {
                                            this.setState({
                                                text: ''
                                            });
                                        }
                                    )
                                }}
                                disabled={(text == undefined || text.trim() == '')} >
                            <i className={'icon send'} ></i>
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {

   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       createMessage: (data) => {
           return dispatch(chatActions.createMessage(data))
       }
   }
}

CreateMessagePanel = connect(mapStateToProps, mapDispatchToProps)(CreateMessagePanel)

export default CreateMessagePanel