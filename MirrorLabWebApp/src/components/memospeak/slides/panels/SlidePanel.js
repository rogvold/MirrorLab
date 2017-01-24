/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MemoSpeakPlayer from '../../player/MemoSpeakPlayer'

import PauseSlidePanel from './PauseSlidePanel'

class SlidePanel extends React.Component {

    static defaultProps = {
        presentationArray: ['t', 'i', 'v', 'a', 'p'],

        url: undefined,
        text: undefined,
        imageUrl: undefined,

        pauseDuration: 2 * 1000, //In case if there is a "p" flag. "P" - pause

        onSlideEnded: () => {
            console.log('slide is ended');
        }

    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getPresMap = () => {
        let map = {};
        let arr = this.props.presentationArray;
        if (arr == undefined){
            return {};
        }
        for (var i in arr){
            let a = arr[i];
            map[a] = a;
        }
        return map;
    }

    onEnded = () => {
        console.log('slide is ended');
        this.props.onSlideEnded();
    }

    render = () => {
        let {url, text, imageUrl, presentationArray, pauseDuration} = this.props;
        let presMap = this.getPresMap();
        let isEmpty = (presentationArray == undefined || presentationArray.length == 0);
        if (isEmpty == true){
            return null;
        }
        console.log('SlidePanel: render: url, text, imageUrl, presentationArray = ', url, text, imageUrl, presentationArray);

        console.log('presMap = ', presMap);

        return (
            <div className={'slide_panel'} >

                {presMap['v'] == undefined ? null :
                    <div className={'video_placeholder'} >
                        <MemoSpeakPlayer onEnded={this.onEnded} url={url} />
                    </div>
                }

                {presMap['a'] == undefined ? null :
                    <div className={'audio_placeholder'} >
                        <MemoSpeakPlayer audioMode={true}  onEnded={this.onEnded} url={url} />
                    </div>
                }

                {presMap['i'] == undefined || imageUrl == undefined ? null :
                    <div className={'image_placeholder'} >
                        <img src={imageUrl} />
                    </div>
                }

                {(presMap['t'] == undefined || text == undefined) ? null :
                    <div className={'text_placeholder'} >
                        <div className="text" >
                            {text}
                        </div>
                    </div>
                }

                {(presMap['p'] == undefined) ? null :
                    <PauseSlidePanel pauseDuration={pauseDuration} onEnded={this.onEnded} />
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

//SlidePanel = connect(mapStateToProps, mapDispatchToProps)(SlidePanel)

export default SlidePanel