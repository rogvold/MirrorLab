/**
 * Created by sabir on 21.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {EditorState} from 'draft-js';

class ImageAdd extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        url: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onSubmit = () => {
        let {url} = this.state;
        let {editorState, modifier, onChange} = this.props;
        let newState = modifier(editorState, url);
        onChange(newState);
    }

    render = () => {
        let {url} = this.state;

        return (
            <div className={'image_add_component'} >

                <div className={'ui form'} >

                    <div className={'field'} >
                        <label>image url</label>
                        <input value={url} onChange={(evt) => {this.setState({url: evt.target.value})}}
                               placeholder={'image url...'} />
                    </div>

                    <div>
                        <button className={'ui button'} onClick={this.onSubmit} >
                            OK
                        </button>
                    </div>

                </div>


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

//ImageAdd = connect(mapStateToProps, mapDispatchToProps)(ImageAdd)

export default ImageAdd