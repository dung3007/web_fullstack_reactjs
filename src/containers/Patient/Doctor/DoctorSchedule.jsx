import React, { Component } from 'react';
import { connect } from "react-redux";
import BookingModal from './Modal/BookingModal';
import './DoctorSchedule.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7;i++) {
            let obj = {};
            if (language === LANGUAGE.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }

        return allDays;
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props;
            let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.idDoctor !== prevProps.idDoctor) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.idDoctor, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.idDoctor && this.props.idDoctor !== -1) {
            let doctorId = this.props.idDoctor;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">
                            <div className='text-calendar'>
                                <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage></span></i>
                            </div>
                            <div className='time-content'>
                                {allAvalableTime && allAvalableTime.length > 0 ? 
                                <>
                                    <div className='time-content-btns'>
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGE.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button onClick={() => this.handleClickScheduleTime(item)} key={index} className={language === LANGUAGE.VI ? 'btn-vi' : 'btn-en'}>{timeDisplay}</button>
                                            )
                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                : (
                                    <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage></div>
                                )
                                }
                            </div>
                    </div>
                </div>
                <BookingModal 
                    isOpenModalBooking={this.state.isOpenModalBooking} 
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
