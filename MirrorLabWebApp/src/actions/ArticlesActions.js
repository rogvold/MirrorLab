/**
 * Created by sabir on 02.01.17.
 */
import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';

//LOAD ARTICLES
let loadArticles_ = () => {
    return {
        type: types.LOAD_ARTICLES
    }
}
let loadArticlesFail = (error) => {
    return {
        type: types.LOAD_ARTICLES_FAIL,
        error: error
    }
}
let loadArticlesSuccess = (articles) => {
    return {
        type: types.LOAD_ARTICLES_SUCCESS,
        articles: articles
    }
}
//thunk
export function loadUserArticles(userId){
    return (dispatch, getState) => {
        dispatch(loadArticles_())
        return ParseAPI.runCloudFunction('loadUserArticles', {userId: userId}).then(
            articles => dispatch(loadArticlesSuccess(articles)),
            error => dispatch(loadArticlesFail(error))
        )
    }
}
export function loadArticle (articleId) {
    return (dispatch, getState) => {
        let map = getState().articlesMap;
        if (map[articleId] != undefined){
            return;
        }
        dispatch(loadArticles_());
        return ParseAPI.runCloudFunction('loadUserArticles', {articleId: articleId}).then(
            article => dispatch(loadArticlesSuccess([article])),
            error => dispatch(loadArticlesFail(error))
        )
    }
}
export function loadAllArticles(){
    return (dispatch, getState) => {
        dispatch(loadArticles_())
        return ParseAPI.runCloudFunction('loadAllArticles', {}).then(
            articles => dispatch(loadArticlesSuccess(articles)),
            error => dispatch(loadArticlesFail(error))
        )
    }
}

//CREATE
let createArticle_ = () => {
    return {
        type: types.CREATE_ARTICLE
    }
}
let createArticleFail = (error) => {
    return {
        type: types.CREATE_ARTICLE_FAIL,
        error: error
    }
}
let createArticleSuccess = (article) => {
    return {
        type: types.CREATE_ARTICLE_SUCCESS,
        article: article
    }
}
//thunk
export function createArticle(data){
    return (dispatch, getState) => {
        dispatch(createArticle_())
        return ParseAPI.runCloudFunctionAsPromise("createArticle", data).then(
            article => dispatch(createArticleSuccess(article)),
            error => dispatch(createArticleFail(error))
        )
    }
}

//UPDATE
let updateArticle_ = () => {
    return {
        type: types.UPDATE_ARTICLE
    }
}
let updateArticleFail = (error) => {
    return {
        type: types.UPDATE_ARTICLE_FAIL,
        error: error
    }
}
let updateArticleSuccess = (article) => {
    return {
        type: types.UPDATE_ARTICLE_SUCCESS,
        article: article
    }
}
//thunk
export function updateArticle(data) {
    return (dispatch, getState) => {
        dispatch(updateArticle_())
        return ParseAPI.runCloudFunctionAsPromise("updateArticle", data).then(
            article => dispatch(updateArticleSuccess(article)),
            error => dispatch(updateArticleFail(error))
        )
    }
}

//DELETE
let deleteArticle_ = () => {
    return {
        type: types.DELETE_ARTICLE
    }
}
let deleteArticleFail = (error) => {
    return {
        type: types.DELETE_ARTICLE_FAIL,
        error: error
    }
}
let deleteArticleSuccess = (id) => {
    return {
        type: types.DELETE_ARTICLE_SUCCESS,
        id: id
    }
}
export function deleteArticle(id) {
    return (dispatch, getState) => {
        dispatch(deleteArticle_())
        return ParseAPI.runCloudFunctionAsPromise("deleteArticle", {id: id}).then(
            () => dispatch(deleteArticleSuccess(id)),
            error => dispatch(deleteArticleFail(error))
        )
    }
}