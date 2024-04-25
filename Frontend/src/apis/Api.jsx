//To connect frontend and backend Using axios and Cors by installing (npm i cors and npm i axios)
import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}


//Creating test Api and calling in HomePage
export const testApi = () => Api.get('/test')
//"http://localhost:5500",

//API fo registration
export const registerApi = (data) => Api.post('/api/signup', data);

//API for forgot password
export const forgotPassword = (data) => Api.post('/api/forgot-password', data)

//API for getting user 
export const getUserApi = (id) => Api.get(`/api/user/${id}`)

//API for updating user 
export const updateUserApi = (id, formdata) => Api.put(`/api/user/edit/${id}`, formdata, config)

//API for deleting user 
export const deleteUserApi = (id) => Api.delete(`/api/admin/user/delete/${id}`, config)

//API for getting jobs
export const getJobsApi = (id) => Api.get(`/api/job/${id}`)

//API for updating job 
export const updateJobApi = (id, formdata) => Api.put(`/api/job/update/${id}`, formdata, config)

//API for deleting user 
export const deleteJobApi = (id) => Api.delete(`/api/jobs/delete/${id}`, config)

//API for creating job 
export const createJobApi = (formData) => Api.post('/api/job/create', formData, config)