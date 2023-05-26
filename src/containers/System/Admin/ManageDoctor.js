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

            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: [],
            description: '',
            listDoctors: [],
            hasOldData: false,
            
            // save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    handleEditorChange({html, text}) {
        this.setState({
            contentHTML: html, 
            contentMarkdown: text
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchDoctorPrice();
        this.props.fetchDoctorPayment();
        this.props.fetchDoctorProvince();
        this.props.fetchAllSpecialty()
        this.props.fetchAllClinic()
    }
    
    buildDataInputSelect = (inputData, type) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length) {
            if(type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            } else if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            } else if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            } else if (type === 'SPECIALTY' || type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let dataSelectPrice = this.buildDataInputSelect(this.props.listPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(this.props.listPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(this.props.listProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(this.props.listSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(this.props.listSpecialty, 'CLINIC')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })
        }

        if(prevProps.listPrice !== this.props.listPrice) {
            let dataSelectPrice = this.buildDataInputSelect(this.props.listPrice, 'PRICE')
            this.setState({
                listPrice: dataSelectPrice
            })
        }

        if(prevProps.listPayment !== this.props.listPayment) {
            let dataSelectPayment = this.buildDataInputSelect(this.props.listPayment, 'PAYMENT')
            this.setState({
                listPayment: dataSelectPayment
            })
        }

        if(prevProps.listProvince !== this.props.listProvince) {
            let dataSelectProvince = this.buildDataInputSelect(this.props.listProvince, 'PROVINCE')
            this.setState({
                listProvince: dataSelectProvince
            })
        }

        if(prevProps.listSpecialty !== this.props.listSpecialty) {
            let dataSelectSpecialty = this.buildDataInputSelect(this.props.listSpecialty, 'SPECIALTY')
            this.setState({
                listSpecialty: dataSelectSpecialty
            })
        }

        if(prevProps.listClinic !== this.props.listClinic) {
            let dataSelectClinic = this.buildDataInputSelect(this.props.listClinic, 'SPECIALTY')
            this.setState({
                listClinic: dataSelectClinic
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty ? this.state.selectedSpecialty.value : ''
        })
    }

    handleOnChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })

        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
        let response = await getDetailInforDoctor(selectedOption.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown && (response.data.Markdown.contentHTML || response.data.Markdown.contentMarkdown || response.data.Markdown.description)) {
            let markdown = response.data.Markdown

            let addressClinic = '', nameClinic = '', note = '', priceId = '', paymentId = '', provinceId = '', specialtyId = '', clinicId = '',
            selectedClinic= [], selectedSpecialty = [], selectedPrice = [], selectedPayment = [], selectedProvince = []
            
            if (response.data.Doctor_Infor) {
                addressClinic = response.data.Doctor_Infor.addressClinic;
                nameClinic = response.data.Doctor_Infor.nameClinic;
                note = response.data.Doctor_Infor.note;
                priceId = response.data.Doctor_Infor.priceId;
                paymentId = response.data.Doctor_Infor.paymentId;
                provinceId = response.data.Doctor_Infor.provinceId;
                specialtyId = response.data.Doctor_Infor.specialtyId
                clinicId = response.data.Doctor_Infor.clinicId

                selectedPrice = listPrice.find(item => item.value === priceId)
                selectedPayment = listPayment.find(item => item.value === paymentId)
                selectedProvince = listProvince.find(item => item.value === provinceId)
                selectedSpecialty = listSpecialty.find(item => item.value === specialtyId)
                selectedClinic = listClinic.find(item => item.value === clinicId)
            }

            this.setState({
                contentHTML: markdown.contentHTML ? markdown.contentHTML : '',
                contentMarkdown: markdown.contentMarkdown ? markdown.contentMarkdown : '',
                description: markdown.description ? markdown.description : '',
                hasOldData : true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',

                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }


    render() {
        let { hasOldData } = this.state;
        let { listPrice, listPayment, listProvince } = this.props
        return (
            <div className="manage-doctor-container">
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea className='form-control' onChange={(e) => this.handleOnChangeText(e, 'description')} value={this.state.description}>
                        
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control' onChange={(e) => this.handleOnChangeText(e, 'nameClinic')} value={this.state.nameClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control' onChange={(e) => this.handleOnChangeText(e, 'addressClinic')} value={this.state.addressClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control' onChange={(e) => this.handleOnChangeText(e, 'note')} value={this.state.note}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{height: '300px'}} renderHTML={text => mdParser.render(text)} onChange={(e) => this.handleEditorChange(e)} value={this.state.contentMarkdown}/>
                </div>
                <button className={hasOldData ? "save-content-doctor" : "create-content-doctor"} onClick={this.handleSaveContentMarkdown}>
                    {hasOldData ? <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        listPrice: state.admin.prices,
        listPayment: state.admin.payments,
        listProvince: state.admin.provinces,
        listSpecialty: state.admin.specialties,
        listClinic: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchDoctorPrice: () => dispatch(actions.fetchDoctorPrice()),
        fetchDoctorPayment: () => dispatch(actions.fetchDoctorPayment()),
        fetchDoctorProvince: () => dispatch(actions.fetchDoctorProvince()),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
        fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
