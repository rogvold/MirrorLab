/**
 * Created by sabir on 24.01.17.
 */

var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var MathHelper = require('../helpers/MathHelper');

var PhotosModule = {



    transformPhoto: function(s){
        if (s == undefined){
            return undefined;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            userId: s.get('userId'),

            version: s.get('version'),
            data: s.get('data'),
            hash: s.get('hash'),
            url: s.get('url')
        }
    },

    createPhoto: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.url == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'url is not defined'});
            return;
        }
        if (data.version == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'version is not defined'});
            return;
        }
        if (data.data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var Photo = Parse.Object.extend('Photo');
        var p = new Photo();
        p.set('userId', data.userId);
        p.set('url', data.url);
        p.set('originalUrl', data.originalUrl);
        p.set('version', data.version);
        p.set('hash', data.hash);
        p.set('data', data.data);
        var self = this;
        p.save().then(function (savedPhoto) {
            success(self.transformPhoto(savedPhoto));
        });
    },

    deletePhoto: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('Photo');
        q.get(data.id, {
            success: function(p){
                p.destroy({
                    success: function(){
                        success(data);
                    },
                    error: function(){
                        error({code: ECR.UNKNOWN_ERROR.code, message: 'can not destroy photo'});
                    }
                })
            },
            error: function(){
                error({code: ECR.NOT_FOUND.code, message: 'can not find photo with id = ' + data.id});
            }
        });
    },

    loadUserPhotos: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var q = new Parse.Query('Photo');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('userId', data.userId);
        var self = this;
        q.find(function(results){
            var photos = results.map(function(r){return self.transformPhoto(r)});
            success(photos);
        });
    }

}


module.exports = PhotosModule;