var UsersModule = require('./modules/UsersModule');
var PhotosModule = require('./modules/PhotosModule');
var UserLinksModule = require('./modules/UserLinksModule');

// Parse.Cloud.define("hello", function(request, response) {
//     var data = request.params.data;
//     response.success(data);
// });

//links

Parse.Cloud.define("loadLinks", function(request, response) {
    var data = request.params.data;
    // response.success(data);
    UserLinksModule.loadUserUserLinks(data, function(d){
        response.success(d);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadUserLinks", function(request, response) {
    var data = request.params.data;
    UserLinksModule.loadUserUserLinks(data, function(d){
        response.success(d);
    }, function(err){
        response.error(err);
    });
});

//shit - repeat
Parse.Cloud.define("loadUserUserLinks", function(request, response) {
    var data = request.params.data;
    UserLinksModule.loadUserUserLinks(data, function(d){
        response.success(d);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.createLink(data, function(link){
        response.success(link);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.deleteLink(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.updateLink(data, function(updatedLink){
        response.success(updatedLink);
    }, function(err){
        response.error(err);
    });
});


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

