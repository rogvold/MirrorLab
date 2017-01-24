/**
 * Created by sabir on 10.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UpdateMemoSpeakForm from '../forms/UpdateMemoSpeakForm'

import * as actions from '../../../actions/MemoSpeakActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class UpdateMemoSpeakPanel extends React.Component {

    static defaultProps = {
        id: undefined,
        onUpdated: () => {

        }
    }

    static propTypes = {

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

    getMemoSpeak = () => {
        let {getMemoSpeakById, id} = this.props;
        return getMemoSpeakById(id);
    }

    onSubmit = (data) => {
        console.log('onSubmit occured: data = ', data);
        let {onUpdated} = this.props;
        let m = this.getMemoSpeak();
        if (m != undefined){
            let d = Object.assign({}, m, data);
            this.props.updateMemoSpeak(d).then(() => {
                onUpdated();
            });
        }else {
            this.props.createMemoSpeak(data).then( () => {
                onUpdated();
            });
        }
    }


    render = () => {
        let {id, loading} = this.props;
        let m = this.getMemoSpeak();

        return (
            <div className={'update_memo_speak_panel'} >

                <UpdateMemoSpeakForm onSubmit={this.onSubmit} />

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getMemoSpeakById = (state, id) => {
    let {memospeaksMap} = state.memospeak;
    if (memospeaksMap == undefined || id == undefined){
        return undefined;
    }
    return memospeaksMap[id];
}

const mapStateToProps = (state) => {
   return {
       getMemoSpeakById: (id) => {
           return getMemoSpeakById(state, id)
       },
       loading: state.memospeak.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       createMemoSpeak: (data) => {
           return dispatch(actions.createMemospeak(data))
       },
       updateMemoSpeak: (data) => {
           return dispatch(actions.updateMemospeak(data))
       }
   }
}

UpdateMemoSpeakPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateMemoSpeakPanel)

export default UpdateMemoSpeakPanel