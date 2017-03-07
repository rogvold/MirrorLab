/**
 * Created by sabir on 01.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SkinryCanvaPanel from '../canvas/SkinryCanvaPanel'

class SkinryImage extends React.Component {

    static defaultProps = {
        url: 'https://mirrorlab.sabir.pro/uploads/kohrzhxeesnyrpdogdjyciuyjlgmlp.jpg',
        landmarks: [],

        spots: [],

        selectedSpotIndex: undefined

    }

    static propTypes = {
        landmarks: PropTypes.array,
        spots: PropTypes.array
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPoints = () => {
        let {landmarks, spots} = this.props;
        console.log('getPoints: landmarks, spots = ', landmarks, spots);
        let landmarksPoints = landmarks.map((p) => {return Object.assign({}, p, {rx: 0.007, ry: 0.007, fillColor: 'grey', borderColor: 'grey'})});

        let spotsPoints = spots.map((p) => {return Object.assign({}, p, {fillColor: 'rgba(240, 128, 128, 0.6)', borderColor: 'lightcoral'})});;

        let res = landmarksPoints.concat(spotsPoints);
        console.log('returning ', res);
        return res;
    }

    getLandmarksPolylines = () => {
        let {landmarks} = this.props;
        if (landmarks == undefined || landmarks.length == 0){
            return [];
        }

        let res = [];
        let outlinePolyline = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k < 17)})
        };
        let leftEyebrow = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 17 && k <= 21)})
        };
        let rightEyebrow = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 22 && k <= 26)})
        };
        let noseStraight = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 27 && k <= 30)})
        };
        let noseBottom = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 31 && k <= 35)})
        };
        let leftEye = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 36 && k <= 41)}).concat([landmarks[36]])
        };
        let rightEye = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 42 && k <= 47)}).concat([landmarks[42]])
        };
        let extMouth = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 48 && k <= 59)}).concat([landmarks[48]])
        };

        let innerMouth = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 60 && k <= 67)}).concat([landmarks[60]])
        };


        let forehead = {
            name: 'outline',
            color: 'grey',
            lines: landmarks.filter((p, k) => {return (k >= 68 && k <= 70)})
        }

        res.push(outlinePolyline);
        res.push(leftEyebrow);
        res.push(rightEyebrow);

        res.push(noseStraight);
        res.push(noseBottom);
        res.push(leftEye);
        res.push(rightEye);
        res.push(extMouth);
        res.push(innerMouth);

        res.push(forehead);

        return res;
    }

    getUnderEyesPolylines = () => {
        let res = [];
        let {undereyes} = this.props;
        if (undereyes == undefined){
            return [];
        }
        let {pointsLeft, pointsRight} = undereyes;
        let left = {
            color: 'blue',
            lines: (pointsLeft.length == 0) ? [] : pointsLeft.concat([pointsLeft[0]])
        }
        let right = {
            color: 'blue',
            lines: (pointsRight.length == 0) ? [] : pointsRight.concat([pointsRight[0]])
        }
        res.push(left);
        res.push(right);
        console.log('getUnderEyesPolylines: returning res = ', res);
        return res;
    }

    getPolylines = () => {
        let res = [];
        res = res.concat(this.getLandmarksPolylines());
        res = res.concat(this.getUnderEyesPolylines());
        return res;
    }


    render = () => {
        const {url} = this.props;
        let points = this.getPoints();
        let polylines = this.getPolylines();

        console.log('SkinryImage: points: ', points);
        console.log('SkinryImage: polylines: ', polylines);


        return (
            <div className={'skinry_image'} >

                <div className={'image_placeholder'} >

                    <img src={url} />

                    <div className={'skinry_canva_panel_placeholder'} >
                        <SkinryCanvaPanel points={points} polylines={polylines} />
                    </div>

                </div>

            </div>
        )
    }

}

export default SkinryImage