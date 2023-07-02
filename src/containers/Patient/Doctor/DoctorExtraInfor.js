import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.idDoctor) {
            let res = await getExtraInforDoctorById(this.props.idDoctor)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }

        if (this.props.idDoctor !== prevProps.idDoctor) {
            let res = await getExtraInforDoctorById(this.props.idDoctor)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailInfor === false ? (
                        <div className='short-infor'>
                            <div><FormattedMessage id="patient.extra-infor-doctor.price" />
                                {extraInfor && extraInfor.priceData ? (
                                    language === LANGUAGE.VI ? (
                                        <NumberFormat className='currentcy' value={extraInfor.priceData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' />
                                        ) : (
                                        <NumberFormat className='currentcy' value={extraInfor.priceData.valueEn} displayType='text' thousandSeparator={true} suffix='$' />
                                        )
                                    ) : ''
                                }
                                <span className='text-detail' onClick={() => this.showHideDetailInfor()}><FormattedMessage id="patient.extra-infor-doctor.detail" /></span>
                            </div>
                        </div>
                        ) : (
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-infor-doctor.price" /></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceData ? (
                                            language === LANGUAGE.VI ? (
                                                <NumberFormat className='currentcy' value={extraInfor.priceData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' />
                                                ) : (
                                                <NumberFormat className='currentcy' value={extraInfor.priceData.valueEn} displayType='text' thousandSeparator={true} suffix='$' />
                                                )
                                            ) : ''
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.paymentData ? ( language === LANGUAGE.VI ? extraInfor.paymentData.valueVi : extraInfor.paymentData.valueEn ) : '' }
                            </div>
                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor()}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span></div>
                        </>
                        )}

                        
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
