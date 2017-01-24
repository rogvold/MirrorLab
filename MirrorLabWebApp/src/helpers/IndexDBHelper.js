/**
 * Created by sabir on 07.01.17.
 */

var Builder = require('indexeddb-promised');

import XHRHelper from './XHRHelper';

const IndexDBHelper = {

    getAppDB: function(appDBName, objName, indexes){
        if (appDBName == undefined){
            appDBName = 'appDB';
        }
        if (objName == undefined){
            objName = "videos";
        }
        if (indexes == undefined){
            indexes = [
                {
                    name: 'url',
                    keyPath: 'url',
                    options: {unique: false}
                },
                {
                    name: 'blob',
                    keyPath: 'blob',
                    options: {unique: false}
                }
            ]
        }
        var builder = new Builder(appDBName);
        var appDB = builder
            .setVersion(1)
            .addObjectStore(
                {
                    name: objName,
                    keyType: {keyPath: 'id', autoIncrement: true},
                    indexes: indexes
                })
            .build();
        return appDB;
    },


    saveBlobToDBAsPromise: function(url, blob){
        var self = this;
        return new Promise(function(resolve, reject){
            var appDB = self.getAppDB();
            appDB.videos.add({url: url, blob: blob}).then(
                function(){
                    resolve({url: url, blob: blob});
                }, function(err){
                    reject(err);
                }
            );
        });
    },

    saveUrlToDb: function(url){
        var self = this;
        return new Promise(function(resolve, reject){
            var appDB = self.getAppDB();
            console.log('appDB = ', appDB);
            appDB.videosByUrl.get(url).then(
                function(val){
                    console.log('found val = ', val);
                    if (val != undefined){
                        resolve(val);
                        return;
                    }
                    console.log('starting loading from url = ' + url);
                    XHRHelper.loadFileAsBlobAsPromise(url).then(
                        function(obj){
                            console.log('XHRHelper: blob is loaded! obj = ', obj);
                            console.log('started saving it to the DB');
                            self.saveBlobToDBAsPromise(url, obj.blob).then(
                                function(sObj){
                                    console.log('saved to db: sObj = ', sObj);
                                    resolve(sObj);
                                },
                                function(err){
                                    console.log('error while saving to DB: err = ', err);
                                    reject(err);
                                }
                            );
                        },
                        function(err){
                            console.log('XHRHelper: error');
                            reject(err);
                        }
                    )
                }, function(err){
                    console.log('videosByUrl: error: err = ', err);
                    reject(err);
                }
            )
        })
    },

    loadUrlBlobMapAsPromise: function(){
        var self = this;
        return new Promise(function(resolve, reject){
            var appDB = self.getAppDB();
            appDB.videosByUrl.getAll().then(function(results){
                var map = {};
                console.log('loadUrlBlobMapAsPromise: results = ', results);
                for (var i in results){
                    var r = results[i];
                    map[r.url] = {
                        url: r.url,
                        blob_uri: URL.createObjectURL(r.blob)
                    }
                }
                console.log('resolved with map = ', map);
                resolve(map);
            }, function(err){
                reject(err);
            });
        });
    },

    getAttitudesIndexes: function(){
        return [{
                name: 'url',
                keyPath: 'url',
                options: {unique: false}
            },
            {
                name: 'attitude',
                keyPath: 'attitude',
                options: {unique: false}
            }];
    },

    saveUserAttitude: function(url, attitude){
        let self = this;
        return new Promise(function(resolve, reject){
            let appDBName = 'appDB2';
            let name = 'attitudes';
            let indexes = self.getAttitudesIndexes();
            let appDB = self.getAppDB(appDBName, name, indexes);
            appDB.attitudesByUrl.get(url).then(
                function(val){
                    if (val != undefined){
                        let id = val.id;
                        appDB.attitudes.delete(id).then(
                            function(){
                                appDB.attitudes.add({url: url, attitude: attitude}).then(
                                    function(){
                                        resolve({url: url, attitude: attitude});
                                    }, function(err){
                                        reject(err);
                                    }
                                );
                            }
                        )
                    }else {
                        appDB.attitudes.add({url: url, attitude: attitude}).then(
                            function(){
                                resolve({url: url, attitude: attitude});
                            }, function(err){
                                reject(err);
                            }
                        );
                    }
                }, function(err){
                    console.log('attitudesByUrl: error: err = ', err);
                    reject(err);
                }
            )
        })
    },

    loadAttitudesMapAsPromise: function(){
        console.log('loadAttitudesMapAsPromise occured');
        let self = this;
        return new Promise(function(resolve, reject){
            let appDBName = 'appDB2';
            let name = 'attitudes';
            let indexes = self.getAttitudesIndexes();
            let appDB = self.getAppDB(appDBName, name, indexes);
            console.log('name, indexes, appDB = ', name, indexes, appDB);
            console.log('appDB.attitudesByUrl = ', appDB.attitudesByUrl);
            appDB.attitudesByUrl.getAll().then(function(results){
                var map = {};
                console.log('loadAttitudesMapAsPromise: results = ', results);
                for (var i in results){
                    var r = results[i];
                    map[r.url] = r.attitude;
                }
                console.log('resolved with map = ', map);
                resolve(map);
            }, function(err){
                reject(err);
            });
        })
    }

}

export default IndexDBHelper