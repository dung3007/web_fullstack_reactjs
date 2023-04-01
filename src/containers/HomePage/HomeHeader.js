import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/bookingcare-2020.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';
import { withRouter } from 'react-router';

import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    render() {
        let language = this.props.language
        const listOptions = [
            { 
                icon: <i className="fas fa-hospital"></i>,
                text: <FormattedMessage id='banner.child1'/>
            },
            { 
                icon: <i className="fas fa-mobile-alt"></i>,
                text: <FormattedMessage id='banner.child2'/>
            },
            { 
                icon: <i className="fas fa-procedures"></i>,
                text: <FormattedMessage id='banner.child3'/>
            },
            { 
                icon: <i className="fas fa-flask"></i>,
                text: <FormattedMessage id='banner.child4'/>
            },
            { 
                icon: <i className="fas fa-user-md"></i>,
                text: <FormattedMessage id='banner.child5'/>
            },
            { 
                icon: <i className="fas fa-briefcase-medical"></i>,
                text: <FormattedMessage id='banner.child6'/>
            },
        ]

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} onClick={() => this.returnToHome()}/>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id='home-header.speciality'/></b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id='home-header.search-doctor'/>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id='home-header.healthy-facility'/></b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id='home-header.select-room'/>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id='home-header.doctor'/></b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id='home-header.select-doctor'/>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id='home-header.fee'/></b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id='home-header.check-healthy'/>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id='home-header.support'/>
                            </div>
                            <div className={language === LANGUAGE.VI ? "language-vi active" : "language-vi"}>
                                <span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGE.EN ? "language-en active" : "language-en"}>
                                <span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-1">
                            <FormattedMessage id='banner.title1'/>
                        </div>
                        <div className="title-2">
                            <FormattedMessage id='banner.title2'/>
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh" className="" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            {listOptions.map((option, index) => {
                                return (
                                    <div key={index} className="option-child">
                                        <div className="icon-child">
                                            {option.icon}
                                        </div>
                                        <div className="text-child">
                                            {option.text}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
