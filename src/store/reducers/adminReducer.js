import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    prices: [],
    payments: [],
    provinces: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyStateStart = {...state}
            copyStateStart.isLoadingGender = true
            return {
                ...copyStateStart
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state}
            copyState.genders = action.data
            copyState.isLoadingGender = false
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            let copyStateFailed = {...state}
            copyStateFailed.isLoadingGender = false
            copyStateFailed.genders = []
            return {
                ...copyStateFailed
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.prices = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_FAILED:
            state.prices = []
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_FAILED:
            state.payments = []
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_FAILED:
            state.provinces = []
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_FAILED:
            state.users = []
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.topDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.allDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;