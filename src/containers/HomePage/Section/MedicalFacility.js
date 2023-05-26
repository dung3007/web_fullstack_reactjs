import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import medicalFacilityImg from '../../../assets/medical-facility/083122lo-go-viet-duc.jpg'
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let setting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        let { dataClinics } = this.state;

        return (
            <React.Fragment>
                <div className="section-share section-medical-facility">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cơ sở y tế nổi bật</span>
                            <button className="btn-section">Tìm kiếm </button>
                        </div>
                        <div className="section-body">
                            <Slider {...setting}>
                                {dataClinics && dataClinics.length > 0 && dataClinics.map((item, index) => {
                                    return (
                                        <div key={index} className="img-customize clinic-child" onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className="outer-bg" style={{display: 'flex', justifyContent: 'center'}}>
                                                <div style={{width: '120px', height: '120px', borderRadius: '50%', backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}/>
                                            </div>
                                            <div className='clinic-name' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
