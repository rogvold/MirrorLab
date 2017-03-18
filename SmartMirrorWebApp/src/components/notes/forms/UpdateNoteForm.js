/**
 * Created by sabir on 06.02.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UpdateNoteForm extends React.Component {

    static defaultProps = {
        content: '',
        buttonName: 'Сохранить',
        onChange: function(d){
            console.log('default: onChange: d = ', d);
        },
        placeholder: 'Расшифровка'
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            content: this.props.content
        });
    }

    componentWillReceiveProps() {

    }

    onSubmit = () => {
        let {content} = this.state;
        this.props.onChange(content);
    }

    render = () => {
        let {content} = this.state;

        return (
            <div className={'update_note_form'} >

                <div className={'ui form'}>
                    <div className={'field'} >

                        <textarea value={content}
                                  placeholder={this.props.placeholder}
                                  onChange={(evt) => {this.setState({content: evt.target.value});}} ></textarea>

                    </div>
                </div>

                <div className={'button_placeholder'} >
                    <button className={'ui primary button fluid'} onClick={this.onSubmit} >
                        <i className={'icon save'} style={{marginRight: 5}} ></i> {this.props.buttonName}
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

//UpdateNoteForm = connect(mapStateToProps, mapDispatchToProps)(UpdateNoteForm)

export default UpdateNoteForm