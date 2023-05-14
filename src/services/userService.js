import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', {email, password})
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }})
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`)
}

const getTopDoctorService = (inputdata) => {
    return axios.get(`/api/top-doctors-home?limit=${inputdata}`)
}

const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctors')
}

const saveDetailDoctorSevice = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

export { 
    handleLogin, getAllUsers, createNewUserService, deleteUserService, editUserService, 
    getAllCodeService, getTopDoctorService, getAllDoctorService, saveDetailDoctorSevice, 
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById,
    getProfileDoctorById, postPatientBookingAppointment
}