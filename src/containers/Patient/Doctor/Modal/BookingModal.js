import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGE } from '../../../../utils';
import Select from 'react-select'
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            timeType: '',

            selectedGender: '',
            genders: ''
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
    }

    buildDataGenders = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj)
            })
        }
        return result;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGenders(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGenders(this.props.genders)
            })
        }
        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                let doctorId = this.props.dataScheduleTimeModal.doctorId;
                let timeType = this.props.dataScheduleTimeModal.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (e, type) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state}
        stateCopy[type] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    buildTimeBooking = (time) => {
        let { language } = this.props;
        if (time && !_.isEmpty(time)) {
            let date = language === LANGUAGE.VI ? moment.unix(+time.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+time.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let timeData = language === LANGUAGE.VI ? time.timeTypeData.valueVi : time.timeTypeData.valueEn
            return `${timeData} - ${date}`

        }
        return ''
    }

    buildDoctorName = (dataDoctor) => {
        let { language } = this.props;
        if (dataDoctor && !_.isEmpty(dataDoctor)) {
            let name = language === LANGUAGE.VI ? `${dataDoctor.doctorData.lastName} ${dataDoctor.doctorData.firstName}` : `${dataDoctor.doctorData.firstName} ${dataDoctor.doctorData.lastName}`
            return name

        }
        return ''
    }

    handleConfirmBooking = async () => {
        // validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal)
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            birthday: date,
            date: this.props.dataScheduleTimeModal.date,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isOpenModalBooking} className='booking-modal-container' >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <div>
                                    <ProfileDoctor 
                                        doctorId={dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : ''}
                                        isShowDescriptionDoctor={false}
                                        dataScheduleTimeModal={dataScheduleTimeModal}
                                        isShowPrice={true}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input value={this.state.fullName} onChange={(e) => this.handleOnChangeInput(e, 'fullName')} className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input value={this.state.phoneNumber} onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')} className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input value={this.state.email} onChange={(e) => this.handleOnChangeInput(e, 'email')} className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input value={this.state.address} onChange={(e) => this.handleOnChangeInput(e, 'address')} className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input value={this.state.reason} onChange={(e) => this.handleOnChangeInput(e, 'reason')} className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        options={this.state.genders}
                                        onChange={this.handleOnChangeSelect}
                                        value={this.state.selectedGender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                            <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
