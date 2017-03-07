/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';


import {Map, Stack, Set} from 'immutable'




import UploadPhotoPanel from '../skinry/upload/panels/UploadPhotoPanel'

import SkinryCanvaPanel from '../skinry/canvas/SkinryCanvaPanel'

import SkinryImage from '../skinry/image/SkinryImage'

import SkinryPimpleEditor from '../skinry/editor/SkinryPimpleEditor'


class DevApp extends React.Component {

     static defaultProps = {

     }

     static propTypes = {

     }

     state = {
         blobUri: undefined
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount(){


     }

     componentWillReceiveProps(){

     }


     render = () => {

         return (
             <div style={{width: 800, height: 600, margin: '0 auto'}}>


                    {/*<SkinryImage*/}
                        {/*url={'https://mirrorlab.sabir.pro/uploads/drnhlsflzytmugqbqaxlaqklyihvsg.jpg'} />*/}


                    <SkinryPimpleEditor />


             </div>
         )
     }

}

 export default DevApp