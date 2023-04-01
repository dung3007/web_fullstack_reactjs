import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from "react-select"
import Header from '../../Header/Header';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { LANGUAGE, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedOption: [],
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if(data && data.length > 0) {
                data = data.map(item => ({...item, isSelected: false}));
            }
            this.setState({
                rangeTime: data
            })
        }
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

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption: selectedOption})
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0]})
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, currentDate } = this.state;
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatDate = new Date(currentDate).getTime()
        let result = []
        if(selectedOption && _.isEmpty(selectedOption)) {
            toast.error('Invalid selected doctor!')
        } else if (!currentDate) {
            toast.error('Invalid date!')
        } else if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let obj = {};
                    obj.doctorId = selectedOption.value;
                    obj.date = formatDate;
                    obj.timeType = item.keyMap;
                    result.push(obj);

                })
            } else {
                toast.error('Invalid selected time!')
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedOption.value,
            date: formatDate
        })
    }

    render() {
        const { language } = this.props;
        const { rangeTime } = this.state;
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                options={this.state.listDoctors}
                                onChange={this.handleChangeSelect}
                            />
                        </div>
                        <div className="col-6">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length && rangeTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index} onClick={() => this.handleClickBtnTime(item)}>
                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button className="btn btn-primary btn-save-schedule" onClick={() => this.handleSaveSchedule()}><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
