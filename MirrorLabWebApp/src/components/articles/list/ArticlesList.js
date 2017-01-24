/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class ArticlesList extends React.Component {

    static defaultProps = {
        articles: []
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
            <div className={'articles_list'} >

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

//ArticlesList = connect(mapStateToProps, mapDispatchToProps)(ArticlesList)

export default ArticlesList