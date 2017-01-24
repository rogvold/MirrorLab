/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UpdateArticlePanel from './UpdateArticlePanel'

import Dialog from '../../../dialog/Dialog'

import UpdateArticlePanel from './UpdateArticlePanel'

class UpdateArticleWrapper extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    state = {
        dialogVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getContent = () => {
        return (
            <div>
                <UpdateArticlePanel id={this.props.id} />
            </div>
        )
    }

    render = () => {
        let {dialogVisible} = this.state;

        return (
            <div className={'update_article_wrapper'} >

                <div className={'wrapper'} onClick={() => {this.setState({dialogVisible: true})}} >
                    {this.props.children}
                </div>

                {dialogVisible == false ? null :
                    <Dialog
                            content={this.getContent()}
                            onClick={() => {this.setState({dialogVisible: false})}}
                    />
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

//UpdateArticleWrapper = connect(mapStateToProps, mapDispatchToProps)(UpdateArticleWrapper)

export default UpdateArticleWrapper