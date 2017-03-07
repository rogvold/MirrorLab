/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import * as constants from './src/constants/AccountConstants'
//
import setup from './src/index.js';

AppRegistry.registerComponent('MirrorLabMobileApp', setup);