/**
 * Created by sabir on 06.06.16.
 */

import I18nFactory from '../data/I18nFactory'

let I18nHelper = {

    getString(lang, name, params){
        if (params == undefined){
            params = [];
        }
        if (name == undefined){
            return '';
        }
        name = name.toUpperCase();
        let s = I18nFactory[name];
        if (s == undefined){
            return '';
        }
        s = s[lang];
        for (let i in params){
            let key = (+i + 1);
            key = '%' + key;
            s = s.replace(key, params[i]);
        }
        return s;
    }

};

export default I18nHelper;