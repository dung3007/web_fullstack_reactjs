import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailClincById, getDetailSpecialtyById } from '../../../services/userService';
import _, { flatten } from 'lodash';
import { LANGUAGE } from '../../../utils';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let clinicId = this.props.match.params.id;
            let res = await getDetailClincById(clinicId)

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId
                })
            }
        } 
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    render() {

        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='specialty-description'>
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <div style={{fontSize: '25px', fontWeight: '600'}}>{dataDetailClinic.name}</div>
                                <div style={{fontSize: '18px', fontWeight: '500'}}>{dataDetailClinic.address}</div>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>
                        </>
                    }
                </div>
                <div className='detail-specialty-body'>
                    {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='dt-content-left'>
                                    <div>
                                        <ProfileDoctor 
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                </div>
                                <div className='dt-content-right'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule 
                                            idDoctor={item}
                                        />
                                    </div>
                                    <div className='doctor-extra-infor'>
                                        <DoctorExtraInfor 
                                            idDoctor={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
