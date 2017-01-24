/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../actions/ArticlesActions'

import Article from './Article'

class ArticlePanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired,

        articlesMap: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        loadArticle: PropTypes.func.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadArticle(this.props.id);
    }

    componentWillReceiveProps() {

    }

    getArticle = () => {
        let {articlesMap, id} = this.props;
        return articlesMap[id];
    }

    render = () => {
        const a = this.getArticle();
        const {loading} = this.props;

        return (
            <div className={'article_panel'} >

                {a == undefined ? null :
                    <Article article={a} />
                }

                {loading == false ? null :
                    <div>
                        loading...
                    </div>
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       articlesMap: state.articles.articlesMap,
       loading: state.articles.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadArticle: (articleId) => {
           return dispatch(actions.loadArticle(articleId))
       }
   }
}

ArticlePanel = connect(mapStateToProps, mapDispatchToProps)(ArticlePanel)

export default ArticlePanel