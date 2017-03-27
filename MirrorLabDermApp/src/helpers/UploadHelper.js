/**
 * Created by sabir on 15.02.17.
 */

import * as constants from '../constants/AccountConstants'

import RNFetchBlob from 'react-native-fetch-blob'

const UploadHelper = {

    transformData: function(d){

        if (__DEV__){
            console.log('transformData: d = ', d);
        }

        // let {currentUser, createPhoto} = this.props;
        //
        // if (d.error != undefined){
        //     alert(d.error.message);
        //     return;
        // }

        let dataToSave = {
            // userId: currentUser.id,
            url: d.imgInfo.fileName,
            originalUrl: d.imgInfo.originalFileName,
            data: d,
            hash: d.imgInfo.hash,
            version: d.version
        }
        return dataToSave;
    },

    uploadPhotoAsPromise: function(uri){
        let self = this;
        return new Promise(function(resolve, reject){
            RNFetchBlob.fetch('POST', constants.UPLOAD_PHOTO_SERVER_URL, {
                'Content-Type' : 'multipart/form-data',
                }, [
                    { name : 'file', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(uri)}
                    ]).then((resp) => {
                                if (__DEV__){
                                    console.log('uploadPhotoAsPromise: success: resp = ', resp);
                                }
                                let data = JSON.parse(resp.data);
                                if (data.error != undefined){
                                    reject(data.error);
                                    return;
                                }
                                resolve(self.transformData(data))
            }).catch((err) => {
                if (__DEV__){
                    console.log('uploadPhotoAsPromise: error: err = ', err);
                }
                reject(err);
            })
        })

    }

}

export default UploadHelper