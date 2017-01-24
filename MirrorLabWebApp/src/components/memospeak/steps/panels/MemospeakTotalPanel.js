/**
 * Created by sabir on 12.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MemoSpeaksListPanel from '../../panels/MemoSpeaksListPanel'

import SecondStepGroupsPanel from '../../steps/second_step/panels/SecondStepGroupsPanel'

class MemospeakTotalPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
    }

    state = {
        currentStepName: 'step1'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getSidebarLinks = () => {
        let {currentStepName} = this.state;
        let arr = [
            {
                name: 'step1',
                displayName: 'Шаг 1',
                active: (currentStepName == 'step1'),
                icon: 'icon home'
            },
            {
                name: 'step2',
                displayName: 'Шаг 2',
                active: (currentStepName == 'step2'),
                icon: 'icon options'
            },
            {
                name: 'step3',
                displayName: 'Шаг 3',
                active: (currentStepName == 'step3'),
                icon: 'icon rocket'
            },
            {
                name: 'step4',
                displayName: 'Шаг 4',
                active: (currentStepName == 'step4'),
                icon: 'icon puzzle'
            }
        ]
        return arr.map((link, k) => {
            let key = 'link_' + k;
            let selectLink = () => {this.setState({currentStepName: link.name})}
            return (
                <div key={key} className={'link ' + ((link.active == true) ? ' active ' : '')} onClick={selectLink} >
                    <i className={link.icon} ></i>
                    {link.displayName}
                </div>
            )
        })
    }

    render = () => {
        let {currentStepName} = this.state;

        return (
            <div className={'memospeak_total_panel'} >

                <div className={'sidebar'} >
                    <div className={'links'} >
                        {this.getSidebarLinks()}
                    </div>
                </div>

                <div className={'content'} >

                    {currentStepName != 'step1' ? null :
                        <MemoSpeaksListPanel />
                    }

                    {currentStepName != 'step2' ? null :
                        <SecondStepGroupsPanel />
                    }

                    {currentStepName != 'step3' ? null :
                        <div>
                            {currentStepName} - {' '}
                            under construction
                        </div>
                    }

                    {currentStepName != 'step4' ? null :
                        <div>
                            {currentStepName} - {' '}
                            under construction
                        </div>
                    }

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

//MemospeakTotalPanel = connect(mapStateToProps, mapDispatchToProps)(MemospeakTotalPanel)

export default MemospeakTotalPanel