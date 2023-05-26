import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import specialtyImg from '../../../assets/specialty/120331-co-xuong-khop.jpg'
import { getAllSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
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
        
        let { listSpecialty } = this.state;

        return (
            <React.Fragment>
                <div className="section-share section-specialty">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section"><FormattedMessage id="home-page.specialty-popular" /></span>
                            <button className="btn-section"><FormattedMessage id="home-page.more-infor" /></button>
                        </div>
                        <div className="section-body">
                            <Slider {...setting}>
                                {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item, index) => {
                                    return (
                                        <div key={index} className="img-customize specialty-child" onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div style={{width: '100%', height: '200px', backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                                            <div className='specialty-name'>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
