/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import CheckboxesPanel from '../checkboxes/CheckboxesPanel.js'

import InputRange from 'react-input-range';

import UploadSampleDataPanel from '../simulator/panels/UploadSampleDataPanel'

import UploadImagePanel from '../upload/UploadImagePanel'
import UploadFilePanel from '../upload/UploadFilePanel'

class DevApp extends React.Component {

     static defaultProps = {

     }

     static propTypes = {

     }

     state = {
        range: {
            min: -1,
            max: 0
        }
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         this.state = {range: {min: 0, max: 1000}}
     }

     componentDidMount(){

     }

     componentWillReceiveProps(){

     }

     getRandomPolylines = (n) => {
         let arr = [];
         if (n == undefined){
             n = 25000;
         }
         for (var i = 0; i < n; i++){
             let  y = Math.random();
             let x = +i;
             arr.push({x: 1.0 * x / n, y: y});
         }
         return [
             {
                 name: 'channel 1',
                 color: 'blue',
                 lines: arr
             }
         ]
     }

     render(){
         let polylines = this.getRandomPolylines(25000);
         // console.log('polylines = ', polylines);

         let {range} = this.state;

         return (
             <div>

                 <div className={'container'} >

                     <UploadSampleDataPanel />

                 </div>

                 <UploadFilePanel />

             </div>

         )
     }

 }

 export default DevApp