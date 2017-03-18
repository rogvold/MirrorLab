/**
 * Created by sabir on 05.09.16.
 */

import * as constants from '../constants/AccountsConstants.js'

var APIFactory = {

    self: this,

    BASE: 'https://ecgexpressparse.sabir.pro/parse/functions/',

    DEFAULT_HEADERS: [{
        name: 'X-Parse-Application-Id',
        value: constants.PARSE_APP_ID
    }, {
        name: 'X-Parse-REST-API-Key',
        value: constants.PARSE_REST_API_KEY
    },
    {
        name: 'Content-Type',
        value: 'application/json'
    }
    ],

    SIGN_IN: {
        name: 'login',
        description: 'метод авторизации пользователя',
        requestType: 'GET',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email пользователя',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'пароль пользователя',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    UPLOAD_SINGLE_CHUNK: {
        name: 'uploadSingleChunk',
        description: 'Метод загрузки данных на сервер',
        requestType: 'POST',
        headers: [],
        parameters: [
            {
                name: 'startTimestamp',
                isRequired: true,
                paramType: 'number',
                description: 'UNIX timestamp старта сессии (в миллисекундах). Пример: 1487012877957'
            },
            {
                name: 'deviceCode',
                isRequired: true,
                paramType: 'string',
                description: 'код устройства'
            },
            {
                name: 'number',
                isRequired: true,
                paramType: 'number',
                description: 'номер пакета'
            },
            {
                name: 'channel1Points',
                isRequired: true,
                paramType: 'array',
                description: 'Данные первого канала. Пример: [333, 444, 556, ...]'
            },
            {
                name: 'channel2Points',
                isRequired: true,
                paramType: 'array',
                description: 'Данные второго канала.  Пример: [444, 666, 909, ...]'
            }
        ]
    },

    UPLOAD_DATA: {
        name: 'uploadData',
        description: 'Метод загрузки данных на сервер',
        requestType: 'POST',
        headers: [],
        parameters: [
            {
                name: 'startTimestamp',
                isRequired: true,
                paramType: 'number',
                description: 'UNIX timestamp старта сессии (в миллисекундах)'
            },
            {
                name: 'deviceCode',
                isRequired: true,
                paramType: 'string',
                description: 'код устройства'
            },
            {
                name: 'channel1Points',
                isRequired: true,
                paramType: 'array',
                description: 'Данные первого канала. Пример: [333, 444, 556, ...]'
            },
            {
                name: 'channel2Points',
                isRequired: true,
                paramType: 'array',
                description: 'Данные второго канала.  Пример: [444, 666, 909, ...]'
            },
            {
                name: 'frequency',
                isRequired: false,
                paramType: 'number',
                description: 'Частота снятия данных прибора (по умолчанию 500)'
            }
        ]
    }



};

module.exports = APIFactory;