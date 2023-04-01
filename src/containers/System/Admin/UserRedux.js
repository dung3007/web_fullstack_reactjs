import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE, CRUD_ACTIONS } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './UserRedux.scss'

import TableManageUser from './TableManageUser';
import { CommonUtils } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            id: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let genders = this.props.genders;
        let roles = this.props.roles;
        let positions = this.props.positions;
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: positions,
                position: positions && positions.length > 0 ? positions[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: roles,
                role: roles && roles.length > 0 ? roles[0].keyMap : ''
            })
        }
        if(prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: genders && genders.length > 0 ? genders[0].keyMap : '',
                position: positions && positions.length > 0 ? positions[0].keyMap : '',
                role: roles && roles.length > 0 ? roles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImageUrl: ''
            })
        }
    }

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageUrl: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImageUrl) return;
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0; i < arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }     
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let { action } = this.state
        if(action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        } else if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                roleId: this.state.role,
                positionId: this.state.position,
                gender: this.state.gender,
                phonenumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }


    }

    onChangeInput = (e, id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: '******',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            id: user.id,
            previewImageUrl: imageBase64
        })
    }
    

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;

        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role} = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>Manager user using Redux</div>
                <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id='manage-user.add' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email' value={email} onChange={(e) => this.onChangeInput(e, 'email')} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' value={password} onChange={(e) => this.onChangeInput(e, 'password')} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text' value={firstName} onChange={(e) => this.onChangeInput(e, 'firstName')}/>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text' value={lastName} onChange={(e) => this.onChangeInput(e, 'lastName')}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text' value={phoneNumber} onChange={(e) => this.onChangeInput(e, 'phoneNumber')}/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' value={address} onChange={(e) => this.onChangeInput(e, 'address')}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control' value={gender} onChange={(e) => this.onChangeInput(e, 'gender')}>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control' value={position} onChange={(e) => this.onChangeInput(e, 'position')}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className='form-control' value={role} onChange={(e) => this.onChangeInput(e, 'role')}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden onChange={(e) => this.handleOnChangeImage(e)} />
                                    <label className='label-upload' htmlFor='previewImg' >Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImageUrl})`}} onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveUser()}>
                                    <FormattedMessage id={this.state.action === CRUD_ACTIONS.EDIT ? 'manage-user.edit' : 'manage-user.save'} />
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action}/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                )}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
