import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
// import { getDetailInforDoctor } from '../../../services/userService';
// import { LANGUAGE } from '../../../utils';
// import moment from 'moment';
// import localization from 'moment/locale/vi'
// import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt()

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }


    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            descriptionHTML: html, 
            descriptionMarkdown: text
        })
    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state}
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Something wrongs!')
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        Quản lí chuyên khoa
                    </div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa</label>
                            <input className='form-control' type='text' value={this.state.name} onChange={(e) => this.handleOnChangeInput(e, 'name')} ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Ảnh chuyên khoa</label>
                            <input className='form-control-file' type='file' onChange={(e) => this.handleOnChangeImage(e)} ></input>
                        </div>
                        <div className='col-12'>
                            <MdEditor 
                                style={{height: '300px'}} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={(e) => this.handleEditorChange(e)} 
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-specialty' onClick={this.handleSaveNewSpecialty}>Save</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
