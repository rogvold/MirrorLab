/**
 * Created by sabir on 03.03.17.
 */

import * as constants from '../constants/AccountConstants.js'
import Parse from 'parse/react-native'

const PhotosAPI = {

    transformPhoto(s){
        if (s == undefined){
            return null;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),
            userId: s.get('userId'),

            version: s.get('version'),
            data: s.get('data'),
            hash: s.get('hash'),
            url: s.get('url'),
            thumbnail: (s.get('thumbnail') == undefined) ? s.get('url') : s.get('thumbnail')
        }
    },

    getUserPhotos(userId, lastUpdated){
        if (lastUpdated == undefined){
            lastUpdated = 0;
        }
        let lastUpdatedDate = new Date(lastUpdated);
        let q = new Parse.Query('Photo');
        q.equalTo('userId', userId);
        q.greaterThan('updatedAt', lastUpdatedDate);
        q.limit(100000);
        let self = this;
        return new Promise((resolve, reject) => {
            q.find().then((photos) => {
                if (__DEV__){
                    console.log('found photos: photos = ', photos);
                }
                photos = photos.map((p) => {
                    return self.transformPhoto(p)
                })
                if (__DEV__){
                    console.log('transormed photos = ', photos);
                }
                resolve(photos);
            });
        })
    }

}

export  default PhotosAPI;