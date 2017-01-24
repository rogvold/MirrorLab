/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ArticleEditor from './ArticleEditor'

class UpdateArticleForm extends React.Component {

    static defaultProps = {
        onChange: (d) => {
            console.log('UpdateArticleForm: default: onChange: data = ', data);
        }
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    state = {
        name: '',
        description: '',
        content: '',
        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            description: this.props.description,
            content: this.props.content,
            changed: false
        });
    }

    componentWillReceiveProps() {

    }

    onSubmit = () => {
        let {name, description, content} = this.state;
        let data = {name: name, description: description, content: content};
        this.props.onChange(data);
    }

    render = () => {
        let {name, description, content, changed} = this.state;

        return (
            <div className={'article_form'} >

                <div className={'info_placeholder'} >
                    <div className={'ui form'} >
                        <div className={'field'} >
                            <label>
                                Name
                            </label>
                            <input value={this.state.name}
                                   placeholder={'Name'}
                                   onChange={(evt) => {this.setState({name: evt.target.value, changed: true})}} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Description
                            </label>
                            <input value={this.state.description}
                                   placeholder={'Description'}
                                   onChange={(evt) => {this.setState({description: evt.target.value, changed: true})}} />
                        </div>
                    </div>
                </div>

                <div className={'editor_placeholder'} >
                    <ArticleEditor content={content} onChange={ (newContent) => {this.setState({content: newContent, changed: true})} } />
                </div>

                <div className={'buttons_placeholder'} >
                    <div className={'save_button_placeholder'} >
                        <button className={'ui button primary'} disabled={!changed} onClick={this.onSubmit} >
                            <i className={'icon save'} ></i> Save
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

//UpdateArticleForm = connect(mapStateToProps, mapDispatchToProps)(UpdateArticleForm)

export default UpdateArticleForm