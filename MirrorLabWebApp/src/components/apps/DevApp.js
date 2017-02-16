/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import MemoSpeakBunchedList from '../memospeak/list/MemoSpeakBunchedList'

import {Map, Stack, Set} from 'immutable'

import IndexDBHelper from "../../helpers/IndexDBHelper"

import VideoCacheLoader from '../cache/VideoCacheLoader'
import VideoCacheTestPanel from '../cache/VideoCacheTestPanel'

import MemoSpeakPlayerTestPanel from '../memospeak/player/MemoSpeakPlayerTestPanel'

import TestSlidesPanel from '../memospeak/slides/panels/TestSlidesPanel'

import UpdateMemoSpeakWrapper from '../memospeak/buttons/UpdateMemoSpeakWrapper'

import MemoSpeaksListPanel from '../memospeak/panels/MemoSpeaksListPanel'

import MemospeakTotalPanel from '../memospeak/steps/panels/MemospeakTotalPanel'

import CoolEditor from '../articles/editor/CoolEditor'
// import PatientEditor from '../articles/editor/PatientEditor'



import UploadPhotoPanel from '../skinry/upload/panels/UploadPhotoPanel'

import SkinryCanvaPanel from '../skinry/canvas/SkinryCanvaPanel'

import SkinryImage from '../skinry/image/SkinryImage'



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

         IndexDBHelper.loadUrlBlobMapAsPromise();

     }

     componentWillReceiveProps(){

     }


     render = () => {

         return (
             <div>

                <div style={{width: 300}} >

                    <SkinryImage
                        url={'https://mirrorlab.sabir.pro/uploads/drnhlsflzytmugqbqaxlaqklyihvsg.jpg'} />

                </div>


             </div>
         )
     }

}

 export default DevApp