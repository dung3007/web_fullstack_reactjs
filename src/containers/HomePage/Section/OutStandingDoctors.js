import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils';
import { withRouter } from 'react-router'

class OutStandingDoctors extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    
    render() {
        
        let arrDoctors = this.state.arrDoctors
        let setting = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: arrDoctors.length <= 4 ? arrDoctors.length : 4,
            slidesToScroll: 1
        }
        let { language } = this.props

        return (
            <React.Fragment>
                <div className="section-share section-outstanding-doctors">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section"><FormattedMessage id="home-page.outstanding-doctor"/></span>
                            <button className="btn-section"><FormattedMessage id="home-page.more-infor"/></button>
                        </div>
                        <div className="section-body">
                            <Slider {...setting}>
                                {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div key={index} style={{width: '200px'}} className="img-customize" onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div style={{border: '1px solid #ffffff', padding: '20px'}}>
                                                <div className="outer-bg" style={{display: 'flex', justifyContent: 'center'}}>
                                                    <div style={{width: '120px', height: '120px', borderRadius: '50%', backgroundImage: `url(${imgBase64})`, backgroundSize: 'contain'}}/>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                                                    <div>{item.lastName}</div>
                                                </div>
                                                </div>
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
        language: state.app.language,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctors));
