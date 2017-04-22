/**
 * Created by sabir on 08.04.17.
 */

let CommonHelper = {

    getDottedString(s, dotChar = '•'){
        let n = (s == undefined) ? 0 : s.length;
        let res = '';
        for (let i = 0; i < n; i++){
            res = res + dotChar;
        }
        return res;
    }

};

export default CommonHelper;