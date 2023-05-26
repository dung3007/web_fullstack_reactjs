import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from '../../HomePage/HomeHeader';
import './VerifyEmail.scss'
// import { LANGUAGE } from '../../../utils';
// import moment from 'moment';
// import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='verify-email-container'>
                    { statusVerify === false ? (
                        <div>
                            Loading data ...
                        </div>
                    ) : (
                        <div className=''>
                            {errCode === 0 ? (
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div>
                            ) : (
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            )
                            }
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
