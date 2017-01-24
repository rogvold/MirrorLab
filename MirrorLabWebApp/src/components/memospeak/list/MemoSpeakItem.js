/**
 * Created by sabir on 02.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BackgroundImage from '../../image/BackgroundImage'

import AttitudeIcon from '../steps/first_step/panels/AttitudeIcon'

class MemoSpeakItem extends React.Component {

    static defaultProps = {
        onClick: () => {

        },
        selected: false
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool
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

    getItem = () => {
        let {memospeaksMap, id} = this.props;
        let item = memospeaksMap[id];
        return Object.assign({}, item, {text: item.transcript});
    }

    onClick = () => {
        console.log('onClick occured');
        this.props.onClick();
    }

    render = () => {
        let item = this.getItem();
        let {selected} = this.props;
        let cl = ' memospeak_item ' + (selected == true ? ' selected ' : '  ');

        return (
            <div className={cl} onClick={this.onClick} >

                <AttitudeIcon id={item.id} />

                <div className={'name_placeholder'} >
                    <div className={'name'} >
                        {item.name}
                    </div>
                </div>
                <div className={'background_placeholder'} >
                    <BackgroundImage image={item.imageUrl} />
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       memospeaksMap: state.memospeak.memospeaksMap
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

MemoSpeakItem = connect(mapStateToProps, mapDispatchToProps)(MemoSpeakItem)

export default MemoSpeakItem