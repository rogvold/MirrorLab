/**
 * Created by sabir on 31.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Layer, Rect, Stage, Group, Line, Circle} from 'react-konva';

import Measure from 'react-measure';

class SkinryCanvaPanel extends React.Component {

    static defaultProps = {

        points: [
            {
                x: 0.1,
                y: 0.1,
                rx: 0.05,
                ry: 0.05,
                fillColor: 'red',
                borderColor: 'black'
            },
            {
                x: 0.3,
                y: 0.2,
                rx: 0.05,
                ry: 0.05,
                fillColor: 'red',
                borderColor: 'black'
            },
            {
                x: 0.2,
                y: 0.6,
                rx: 0.05,
                ry: 0.05,
                fillColor: 'red',
                borderColor: 'black'
            },
        ],

        polylines: [
            {
                name: 'line 1',
                color: 'blue',
                lines: [{
                    x: 0.1,
                    y: 0.13
                }, {
                    x: 0.12,
                    y: 0.5
                }, {
                    x: 0.9,
                    y: 0.7
                }]
            },
            {
                name: 'line 2',
                color: 'green',
                lines: [{
                    x: 0.06,
                    y: 0.23
                }, {
                    x: 0.42,
                    y: 0.59
                }, {
                    x: 0.29,
                    y: 0.47
                }]
            }
        ]

    }

    static propTypes = {}

    state = {
        dimensions: {
            width: -1,
            height: -1
        }
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPoints = () => {
        let {points} = this.props;
        let {width, height} = this.state.dimensions;

        return points.map( (p, k) => {
            let key = 'circle_' + k;
            let r = Math.max(Math.min((+p.rx) * (+width), (+p.ry) * (+height)), 0);

            return (
                <Circle key={k}
                        x={(+p.x) * (+width)}
                        y={(+p.y) * (+height)}
                        radius={r}
                        fill={p.fillColor}
                        stroke={p.borderColor}
                        strokeWidth={1}
                />
            )
        })
    }

    // getLines = (points) => {
    //     return points.map( (p, k) => {
    //         let key = 'lp_' + k;
    //         return (
    //
    //         )
    //     })
    // }

    getPolylines = () => {
        let {polylines} = this.props;
        let {width, height} = this.state.dimensions;
        if (polylines == undefined){
            polylines = [];
        }

        return polylines.map( (p, k) => {
            let key = 'polyline_' + k;
            let r = Math.min((+p.rx) * (+width), (+p.ry) * (+height));
            let arr = [];
            for (var i in p.lines){
                let po = p.lines[i];
                if (po == undefined){
                    continue;
                }
                arr.push((+po.x) * (+width));
                arr.push((+po.y) * (+height));
            }
            return (
                <Group key={key} >

                    <Line
                        points={arr}
                        tension={0.7}
                        lineCap={'round'}
                        stroke={p.color}
                        strokeWidth={2}
                    />
                </Group>
            )
        })
    }


    render = () => {
        const {width, height} = this.state.dimensions;

        return (
            <div className={'skinry_canva_panel'} >
                <Measure
                         onMeasure={(dimensions) => {
                             this.setState({dimensions})
                         }}
                    >
                    <div className={'skinry_canva_div'} >

                        <Stage width={width} height={height}>
                            <Layer>

                                {this.getPoints()}

                                {this.getPolylines()}

                            </Layer>
                        </Stage>

                    </div>



                </Measure>
            </div>

        )
    }

}


export default SkinryCanvaPanel