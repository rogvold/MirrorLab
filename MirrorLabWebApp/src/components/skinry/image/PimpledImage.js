/**
 * Created by sabir on 24.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class PimpledImage extends React.Component {

    static defaultProps = {
        switchViewEnabled: false
    }

    static propTypes = {}

    state = {
        mode: 'all'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPimples = () => {
        let {pimples} = this.props;
        if (pimples == undefined){
            pimples = [];
        }
        return pimples.map((p, k) => {
            let key = 'pimple_' + k;
            let rx = (+p.rx) * 100;
            let ry = (+p.ry) * 100;
            let x = (+p.x * 100 - (rx / 2.0));
            let y = (+p.y * 100 - (ry / 2.0));
            let st = Object.assign({}, {left: x + '%', top: y + '%', width: rx + '%', height: ry + '%'});
            return (
                <div className={'pimple'} key={key} style={st} >

                </div>
            );
        })
    }

    onClick = () => {
        let {switchViewEnabled} = this.props;
        let {mode} = this.state;
        console.log('onClick: switchViewEnabled, mode = ', switchViewEnabled, mode);
        if (switchViewEnabled != true){
            return;
        }
        let newMode = 'all';
        switch (mode){
            case 'all':
                newMode = 'none'
                break;
            case 'none':
                newMode = 'all';
                break;
            default:
                newMode = 'all';
        }
        this.setState({
            mode: newMode
        });
    }

    render = () => {
        let {src, pimples, switchViewEnabled} = this.props;
        let {mode} = this.state;

        if (src == undefined){
            return null;
        }
        let st = Object.assign({}, (switchViewEnabled == true) ? {cursor: 'pointer'} : {});

        return (
            <div className={'pimpled_image'} style={st} onClick={this.onClick} >

                <img src={src} />

                {mode != 'all' ? null :
                    <div className={'pimples_placeholder'} >
                        <div className={'pimples'} >
                            {this.getPimples()}
                        </div>
                    </div>
                }

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//PimpledImage = connect(mapStateToProps, mapDispatchToProps)(PimpledImage)

export default PimpledImage