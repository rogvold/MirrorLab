/**
 * Created by sabir on 02.03.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UploadFileWrapper from '../../../upload/UploadFileWrapper'

class AttachmentsList extends React.Component {

    static defaultProps = {

        attachments: [],

        onRemove: (k) => {

        },

        onAdd: (att) => {

        },

        editMode: true

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

    onAttRemove = (k) => {
        let {attachments} = this.props;
        let att = attachments[k];
        if (confirm('Вы действительно хотите удалить файл "' + att.name + '" ?') == false){
            return;
        }
        this.props.onRemove(k);
    }

    onFileUploaded = (att) => {
        this.props.onAdd(att);
    }

    render = () => {
        let {attachments, editMode} = this.props;

        return (
            <div className={'attachments_list_placeholder'} >

                {(attachments == undefined || attachments.length == 0) ? null :
                    <div className={'attachments_list'} >
                    {attachments.map((a, k) => {
                        let key = 'att_' + k;
                        let onRemove = this.onAttRemove.bind(this, k);
                        return (
                            <div className={'attachment'} key={key} >
                                <a href={a.url} target={'_blank'} >{a.name}</a>
                                {editMode == false ? null :
                                    <span className={'att_remove_button'}
                                          onClick={onRemove}
                                    ><i className={'icon remove'} ></i></span>
                                }

                            </div>
                        );
                    })}
                    </div>
                }
                {editMode == false ? null :
                    <div className={'add_new_attachment_placeholder'}>
                        <UploadFileWrapper onFileUploaded={this.onFileUploaded}>
                        <span className={'add_attachment_button'}>
                            <i className={'icon attach'}></i> добавить файл
                        </span>
                        </UploadFileWrapper>
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

//AttachmentsList = connect(mapStateToProps, mapDispatchToProps)(AttachmentsList)

export default AttachmentsList