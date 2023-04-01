import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import specialtyImg from '../../../assets/specialty/120331-co-xuong-khop.jpg'

class Specialty extends Component {

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
                img: specialtyImg,
                text: 'Cơ xương khớp 1'
            },
            {
                img: specialtyImg,
                text: 'Cơ xương khớp 2'
            },
            {
                img: specialtyImg,
                text: 'Cơ xương khớp 3'
            },
            {
                img: specialtyImg,
                text: 'Cơ xương khớp 4'
            },
            {
                img: specialtyImg,
                text: 'Cơ xương khớp 5'
            },
            {
                img: specialtyImg,
                text: 'Cơ xương khớp 6'
            }
        ]

        return (
            <React.Fragment>
                <div className="section-share section-specialty">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Chuyên khoa phổ biến</span>
                            <button className="btn-section">Xem thêm</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
