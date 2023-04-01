import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import medicalFacilityImg from '../../../assets/medical-facility/083122lo-go-viet-duc.jpg'

class MedicalFacility extends Component {

    render() {
        let setting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        const listSpecialty = [
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 1'
            },
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 2'
            },
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 3'
            },
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 4'
            },
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 5'
            },
            {
                img: medicalFacilityImg,
                text: 'Bệnh viện hữu nghị Việt Đức 6'
            }
        ]

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
                                {listSpecialty.map((item, index) => {
                                    return (
                                        <div key={index} className="img-customize">
                                            <img src={item.img} />
                                            <div>{item.text}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
