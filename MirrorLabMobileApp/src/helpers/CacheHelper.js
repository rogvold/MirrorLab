/**
 * Created by sabir on 02.03.17.
 */
import RNFetchBlob from "react-native-fetch-blob";
const SHA1 = require("crypto-js/sha1");


let CacheHelper = {

    getImageCachedUri: (url) => {
        const path = RNFetchBlob.fs.dirs.CacheDir + "_immutable_images/" + SHA1(url) + ".jpg";
        return new Promise( (resolve, reject) => {
            RNFetchBlob.fs.exists(path).then(exists => {
                if(exists) {
                    if (__DEV__){
                        console.log('Photo ' + url + ' is stored locally: path = ' + path);
                    }
                    resolve(path);
                } else {
                    return RNFetchBlob.config({ path })
                        .fetch("GET", url, {})
                        .then(() => {resolve(path)});
                }
            });
        })
    }

}

export default CacheHelper;