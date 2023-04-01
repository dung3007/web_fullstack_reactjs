import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLogin } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUserName = (e) => {
        this.setState({ 
            username: e.target.value
        })
    }
    handleOnChangePassword = (e) => {
        this.setState({ 
            password: e.target.value
        })
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            this.handleLogin()
        }
    }

    handleLogin =  async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errorMessage: e.response.data.message
                    })
                }
            }
            
        }
    }

    handleShowHidePassword = () => {
        this.setState({ 
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input 
                                type="text"
                                placeholder="Enter your username" 
                                className="form-control"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUserName(e)}
                            ></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    placeholder="Enter your password" 
                                    className="form-control"
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                <span
                                    onClick={() => this.handleShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errorMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
