import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import { getDetailInforDoctor } from '../../../services/userService'
// import ModalUser from './ModalUser';
// import ModalEditUser from './ModalEditUser';
// import { emitter } from '../../utils/emitter';
import Select from 'react-select'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { CRUD_ACTIONS, LANGUAGE } from '../../../utils';



const mdParser = new MarkdownIt()

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: [],
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }

    handleEditorChange({html, text}) {
        this.setState({
            contentHTML: html, 
            contentMarkdown: text
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
    }
    
    buildDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language === LANGUAGE.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })
        let response = await getDetailInforDoctor(selectedOption.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown && (response.data.Markdown.contentHTML || response.data.Markdown.contentMarkdown || response.data.Markdown.description)) {
            let markdown = response.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML ? markdown.contentHTML : '',
                contentMarkdown: markdown.contentMarkdown ? markdown.contentMarkdown : '',
                description: markdown.description ? markdown.description : '',
                hasOldData : true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    }

    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }


    render() {
        let { hasOldData } = this.state
        return (
            <div className="manage-doctor-container">
                <div className='manage-doctor-title'>Tạo thêm thông tin doctor</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>
                            Thông tin giới thiệu
                        </label>
                        <textarea className='form-control' rows="4" onChange={this.handleOnChangeDesc} value={this.state.description}>
                        
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{height: '500px'}} renderHTML={text => mdParser.render(text)} onChange={(e) => this.handleEditorChange(e)} value={this.state.contentMarkdown}/>
                </div>
                <button className={hasOldData ? "save-content-doctor" : "create-content-doctor"} onClick={this.handleSaveContentMarkdown}>
                    {hasOldData ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
