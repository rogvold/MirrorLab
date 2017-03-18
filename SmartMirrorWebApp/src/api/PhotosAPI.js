/**
 * Created by sabir on 16.03.17.
 */

import ParseAPI from './ParseAPI'

const PhotosAPI = {

    transformPhoto(p) {
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            timestamp: new Date(p.createdAt).getTime(),
            updatedTimestamp: new Date(p.updatedAt).getTime(),

            url: p.get('url'),
            thumbnail: p.get('thumbnail') == undefined ? p.get('thumbnail') : p.get('url'),
            data: p.get('data')
        }
    }

}

export default PhotosAPI