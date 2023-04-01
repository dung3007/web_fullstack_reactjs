import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: []
        }
    }

    setArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7;i++) {
            let obj = {};
            if (language === LANGUAGE.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }

        this.setState({
            allDays: allDays
        })
    }

    async componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props;
            this.setArrDays(language)
        }
    }

    render() {
        let {allDays} = this.state;
        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
