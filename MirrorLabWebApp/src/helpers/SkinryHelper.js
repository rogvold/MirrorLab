/**
 * Created by sabir on 23.01.17.
 */

const SkinryHelper = {

    getXmlHttp: function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    },

    //returns blob uri
    loadFile: function(url, onSuccess, onError, onProgress, asBlob){
        console.log('loadFile: url = ', url);
        if (url == undefined){
            return;
        }
        var xmlhttp = this.getXmlHttp();
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function() {
            if (this.status == 200) {
                if (asBlob == true){
                    onSuccess(this.response);
                }else {
                    var blob_uri = URL.createObjectURL(this.response);
                    onSuccess(blob_uri);
                }
            }else {
                if (onError != undefined){
                    onError();
                }
            }
        };
        xmlhttp.onerror = function(){
            if (onError != undefined){
                onError();
            }
        }
        xmlhttp.onprogress = function(event){
            if (onProgress != undefined){
                onProgress(event.loaded, event.total);
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send(null);
    },



    loadFileAsBlobAsPromise: function(url){
        console.log('loadFileAsBlobAsPromise: url = ' + url);
        var self = this;
        return new Promise(function(resolve, reject){
            self.loadFile(url, function(blob){
                resolve({blob: blob, url: url});
            }, function(){
                reject();
            }, undefined, true);
        });
    },

    uploadFile: function(file, onSuccess, onError, onProgress){
        var uploadUrl = 'https://www.englishpatientdrive.pw/dropzone/upload.php';
        var baseDir = 'https://www.englishpatientdrive.pw/dropzone/uploads/';

        var xhr = this.getXmlHttp();
        // var xhr = SkinryHelper.getXmlHttp();
        var formData = new FormData();
        formData.append("file", file);

        xhr.onload = function() {
            if (this.status == 200) {
                console.log('onload occured: this.response = ', this.response);
                onSuccess(baseDir + this.response);
                //var blob_uri = URL.createObjectURL(this.response);
                //onSuccess(blob_uri);
            }else {
                //onError();
            }
        };
        xhr.onerror = function(){
            onError();
        }
        xhr.upload.onprogress = function(event){
            if (onProgress != undefined){
                console.log('onprogress: event = ', event);
                var perc = Math.round(1000.0 * event.loaded / event.total) / 10.0;
                onProgress(perc);
                //onProgress(event.loaded, event.total);
            }
        }
        xhr.open('POST', uploadUrl, true);
        xhr.send(formData);

    },

    uploadSkinryPhoto: function(file, onSuccess, onError, onProgress){
        let uploadUrl = 'https://mirror.sabir.pro/upload';
        // var xhr = this.getXmlHttp();
        var xhr = SkinryHelper.getXmlHttp();
        var formData = new FormData();
        formData.append("file", file);
        xhr.onload = function() {
            if (this.status == 200) {
                console.log('onload occured: this.response = ', this.response);
                // onSuccess(baseDir + this.response);
                onSuccess(JSON.parse(this.response));
                //var blob_uri = URL.createObjectURL(this.response);
                //onSuccess(blob_uri);
            }else {
                //onError();
            }
        };
        xhr.onerror = function(){
            onError();
        }
        xhr.upload.onprogress = function(event){
            if (onProgress != undefined){
                console.log('onprogress: event = ', event);
                var perc = Math.round(1000.0 * event.loaded / event.total) / 10.0;
                onProgress(perc);
                //onProgress(event.loaded, event.total);
            }
        }
        xhr.open('POST', uploadUrl, true);
        xhr.send(formData);
    }

}

export default SkinryHelper
