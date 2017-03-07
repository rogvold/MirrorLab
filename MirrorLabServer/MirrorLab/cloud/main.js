var UsersModule = require('./modules/UsersModule');
var PhotosModule = require('./modules/PhotosModule');

require('./app.js');

Parse.Cloud.define("loadUserPhotos", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    PhotosModule.loadUserPhotos(data, function(photos){
        response.success({photos: photos, userId: data.userId});
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createPhoto", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    PhotosModule.createPhoto(data, function(photo){
        response.success(photo);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deletePhoto", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    PhotosModule.deletePhoto(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updatePhoto", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    PhotosModule.updatePhoto(data, function(p){
        response.success(p);
    }, function(err){
        response.error(err);
    });
});