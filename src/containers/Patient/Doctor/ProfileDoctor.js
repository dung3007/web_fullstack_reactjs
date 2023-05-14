import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './ProfileDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getProfileDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }


    async componentDidMount() {
        let id = this.props.doctorId;
        let data = await this.getInforDoctor(id);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (time) => {
        let { language } = this.props;
        if (time && !_.isEmpty(time)) {
            let date = language === LANGUAGE.VI ? moment.unix(+time.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+time.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let timeData = language === LANGUAGE.VI ? time.timeTypeData.valueVi : time.timeTypeData.valueEn
            return (
                <>
                    <div>
                        {timeData} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.freeBooking" />
                    </div>
                </>
            )

        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataScheduleTimeModal } = this.props;

        let nameVi = ''
        let nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <React.Fragment>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGE.VI ? nameVi : nameEn}
                            </div>
                            {isShowDescriptionDoctor ? (
                            <div className='down'>
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                    <span>{dataProfile.Markdown.description}</span>
                                }
                            </div>
                            ) : (
                                <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                            )}
                        </div>
                    </div>
                    
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" />
                        { dataProfile && dataProfile.Doctor_Infor
                            ? (
                                language === LANGUAGE.VI 
                                ? <NumberFormat className='currentcy' value={dataProfile.Doctor_Infor.priceData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' /> 
                                : <NumberFormat className='currentcy' value={dataProfile.Doctor_Infor.priceData.valueEn} displayType='text' thousandSeparator={true} suffix='$' />
                            )
                            : ''
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
