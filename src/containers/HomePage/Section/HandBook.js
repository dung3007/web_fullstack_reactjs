import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import handBookImg from '../../../assets/handbook/goi-cham-soc-suc-khoa-tai-nha.jpg'

class HandBook extends Component {

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
                img: handBookImg,
                text: 'Gói chăm sóc 1'
            },
            {
                img: handBookImg,
                text: 'Gói chăm sóc 2'
            },
            {
                img: handBookImg,
                text: 'Gói chăm sóc 3'
            },
            {
                img: handBookImg,
                text: 'Gói chăm sóc 4'
            },
            {
                img: handBookImg,
                text: 'Gói chăm sóc 5'
            },
            {
                img: handBookImg,
                text: 'Gói chăm sóc 6'
            }
        ]

        return (
            <React.Fragment>
                <div className="section-share section-handle-book">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cẩm nang</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
