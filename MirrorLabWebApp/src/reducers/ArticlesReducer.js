/**
 * Created by sabir on 02.01.17.
 */
import * as types from '../constants/ActionTypes.js'

const initialState = {
    loading: false,
    articlesMap: {},
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeArticles = (state, articles) => {
    if (articles == undefined){
        return state;
    }
    let articlesMap = Object.assign({}, state.articlesMap);
    for (let a of articles){
        articlesMap[a.id] = a;
    }
    return Object.assign({}, state.articlesMap, articlesMap);
}

const deleteArticle = (state, articleId) => {
    if (articleId == undefined){
        return state.articlesMap;
    }
    let map = Object.assign({}, state.articlesMap);
    for (let key in map){
        if (key == undefined){
            continue;
        }
        if (key == articleId){
            map[key] = undefined;
        }
    }
    return map;
}

const ArticlesReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_ARTICLES:
            return startLoading(state, action)
        case types.LOAD_ARTICLES_FAIL:
            return stopLoading(state, action)
        case types.LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesMap: consumeArticles(state, action.articles)
            }

        case types.CREATE_ARTICLE:
            return startLoading(state, action)
        case types.CREATE_ARTICLE_FAIL:
            return stopLoading(state, action)
        case types.CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesMap: consumeArticles(state, [action.article])
            }

        case types.UPDATE_ARTICLE:
            return startLoading(state, action)
        case types.UPDATE_ARTICLE_FAIL:
            return stopLoading(state, action)
        case types.UPDATE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesMap: consumeArticles(state, [action.article])
            }

        case types.DELETE_ARTICLE:
            return startLoading(state, action)
        case types.DELETE_ARTICLE_FAIL:
            return stopLoading(state, action)
        case types.DELETE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesMap: deleteArticle(state, action.id)
            }


        default:
            return state;
    }

}

export default ArticlesReducer;
