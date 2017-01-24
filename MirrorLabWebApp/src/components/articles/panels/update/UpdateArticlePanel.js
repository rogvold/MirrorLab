/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../actions/ArticlesActions'

import UpdateArticleForm from '../../forms/UpdateArticleForm'

class UpdateArticlePanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        id: PropTypes.string.isRequired,

        updateArticle: PropTypes.func.isRequired,
        loading : PropTypes.bool.isRequired,
        articlesMap: PropTypes.object.isRequired
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

    getArticle = () => {
        let {articlesMap, id} = this.props;
        return articlesMap[id];
    }

    onChange = (d) => {
        let a = this.getArticle();
        let data = Object.assign({}, a, d);
        this.props.updateArticle(data);
    }

    render = () => {
        let article = this.getArticle();
        if (article == undefined){
            return null;
        }
        let {name, description, content} = article;
        let {loading} = this.props;

        return (
            <div className={'update_article_panel'} >

                {loading == false ? null :
                    <div>
                        loading ...
                    </div>
                }

                <div className={'form_placeholder'} >
                    <UpdateArticleForm
                        onChange={this.onChange}
                        name={name} description={description} content={content} />
                </div>

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
       updateArticle: (data) => {
           return dispatch(actions.updateArticle(data))
       }
   }
}

UpdateArticlePanel = connect(mapStateToProps, mapDispatchToProps)(UpdateArticlePanel)

export default UpdateArticlePanel