/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ArticlesList from './ArticlesList'

class ArticlesSearchableList extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        query: ""
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    isInSearch = (a) => {
        let {query} = this.state;
        if (query == undefined || query.trim() == ''){
            return a;
        }
        return a;
    }

    getArticles = () => {
        let {articles} = this.props;
        let arr = [];
        for (let i in articles){
            let a = articles[i];
            if (this.isInSearch(a) == true){
                arr.push(a);
            }
        }
        return arr;
    }

    render = () => {

        return (
            <div className={'articles_searchable_list'} >

                <div className={'search_bar_placeholder'} >
                    <div className={'ui form'} >
                        <div className={'field'} >
                            <input value={this.state.query} onChange={ (evt) => {this.setState({query: evt.target.value})}} />
                        </div>
                    </div>
                </div>

                <div className={'list_placeholder'} >
                    <ArticlesList articles={this.getArticles()} />
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

//ArticlesSearchableList = connect(mapStateToProps, mapDispatchToProps)(ArticlesSearchableList)

export default ArticlesSearchableList