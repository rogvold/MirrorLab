/**
 * Created by sabir on 10.01.17.
 */

const MemoSpeakHelper = {

    getSlidesForSecondStep: (materials, pauseDuration) => {
        if (materials == undefined || materials.length == 0){
            return [];
        }
        let res = [];
        let arr2 = [];
        for (let i in materials){
            let data = materials[i];
            let arr = [
                Object.assign({}, data, {presentationArray: ['v']}),
                Object.assign({}, data, {presentationArray: ['v', 't']}),
                Object.assign({}, data, {presentationArray: ['i', 't', 'a']}),
                Object.assign({}, data, {presentationArray: ['t', 'a']}),
                Object.assign({}, data, {presentationArray: ['a']}),
                Object.assign({}, data, {presentationArray: ['i', 'a']})
            ];
            arr2 = [];
            for (let j in arr){
                arr2.push(arr[j]);
                console.log('arr2 = ', arr2);
                if (pauseDuration != undefined && pauseDuration != 0){
                    arr2.push({presentationArray: ['p'], pauseDuration: pauseDuration})
                }
            }
            res = res.concat(arr2);
        }
        console.log('getSlidesForSecondStep: res = ', res);
        return res;
    }

}

export default MemoSpeakHelper