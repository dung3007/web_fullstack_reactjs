import actionTypes from './actionTypes';
import { createNewUserService, deleteUserService, editUserService, getAllClinic, getAllCodeService, getAllDoctorService, getAllUsers, getTopDoctorService, saveDetailDoctorSevice } from '../../services/userService';
import { toast } from 'react-toastify';
import { getAllSpecialty } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailded())
            }
        } catch (e) {
            dispatch(fetchGenderFailded())
            console.log(e)
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailded())
            }
        } catch (e) {
            dispatch(fetchPositionFailded())
            console.log(e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailded())
            }
        } catch (e) {
            dispatch(fetchRoleFailded())
            console.log(e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchDoctorPrice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('price')
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data))
            } else {
                dispatch(fetchPriceFailded())
            }
        } catch (e) {
            dispatch(fetchPriceFailded())
            console.log(e)
        }
    }
}

export const fetchPriceSuccess = (priceData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: priceData
})

export const fetchPriceFailded = () => ({
    type: actionTypes.FETCH_PRICE_FAILED
})

export const fetchDoctorPayment = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('payment')
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentSuccess(res.data))
            } else {
                dispatch(fetchPaymentFailded())
            }
        } catch (e) {
            dispatch(fetchPaymentFailded())
            console.log(e)
        }
    }
}

export const fetchPaymentSuccess = (paymentData) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: paymentData
})

export const fetchPaymentFailded = () => ({
    type: actionTypes.FETCH_PAYMENT_FAILED
})

export const fetchDoctorProvince = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('province')
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceSuccess(res.data))
            } else {
                dispatch(fetchProvinceFailded())
            }
        } catch (e) {
            dispatch(fetchProvinceFailded())
            console.log(e)
        }
    }
}

export const fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData
})

export const fetchProvinceFailded = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
})

export const fetchAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty()
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data))
            } else {
                dispatch(fetchAllSpecialtyFailded())
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFailded())
            console.log(e)
        }
    }
}

export const fetchAllSpecialtySuccess = (specialtyData) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: specialtyData
})

export const fetchAllSpecialtyFailded = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
})

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic()
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data))
            } else {
                dispatch(fetchAllClinicFailded())
            }
        } catch (e) {
            dispatch(fetchAllClinicFailded())
            console.log(e)
        }
    }
}

export const fetchAllClinicSuccess = (clinicData) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: clinicData
})

export const fetchAllClinicFailded = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Create a new user successed!")
                dispatch(createNewUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Create a new user error!")
                dispatch(createNewUserFailed())
            }
        } catch (e) {
            dispatch(createNewUserFailed())
            console.log(e)
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("Delete the user successed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete user error!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Edit the user successed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Edit user error!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed())
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailded())
            }
        } catch (e) {
            dispatch(fetchAllUsersFailded())
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailded = () => ({
    type: actionTypes.FETCH_USERS_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService('10')
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailded())
            console.log(e)
        }
    }
}

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    topDoctors: data
})

export const fetchTopDoctorsFailded = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService()
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailded())
            console.log(e)
        }
    }
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    allDoctors: data
})

export const fetchAllDoctorsFailded = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorSevice(data)
            if (res && res.errCode === 0) {
                toast.success('Save info detail doctor succeed!')
                dispatch(saveDetailDoctorsSuccess())
            } else {
                toast.error('Save info detail doctor error!')
                dispatch(saveDetailDoctorsFailded())
            }
        } catch (e) {
            toast.error('Save info detail doctor error!')
            dispatch(saveDetailDoctorsFailded())
            console.log(e)
        }
    }
}

export const saveDetailDoctorsSuccess = (data) => ({
    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS
})

export const saveDetailDoctorsFailded = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchAllScheduleTimeFailded())
            console.log(e)
        }
    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
})

export const fetchAllScheduleTimeFailded = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
})