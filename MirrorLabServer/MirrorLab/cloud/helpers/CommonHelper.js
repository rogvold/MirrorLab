/**
 * Created by sabir on 20.08.16.
 */

var CommonHelper = {

    getRandomString: function(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKMNPQRSTUVWXYZ23456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    },

    validateEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    getUniqueArray: function(arr){
        var map = {};
        for (var i in arr){
            map[arr[i]] = 1;
        }
        var res = [];
        for (var key in map){
            res.push(key);
        }
        return res;
    }

};

module.exports = CommonHelper;