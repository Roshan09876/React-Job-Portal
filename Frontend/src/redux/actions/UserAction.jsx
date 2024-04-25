import axios from 'axios';
import {
    LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
    USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOAD_FAIL,
    USER_APPLY_JOB_REQUEST, USER_APPLY_JOB_FAIL, USER_APPLY_JOB_SUCCESS,
    ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, ALL_USER_LOAD_FAIL
} from "../constants/UserConstant"
import { toast } from 'react-toastify';
import { Navigate } from 'react-router';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post("/api/signin", user);
        console.log(response);
        const { data } = response ? response : {};
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error
        });
        toast.error('Please enter valid email or password');
    }
}

//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//User Logout Action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/logout")
        const userInfo = localStorage.getItem('userInfo')
        localStorage.removeItem('userInfo')
        console.log(data);
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data
        });
        if (userInfo == null) {
            toast.error("You must login first")
        } else {
            toast.success("Logout Successfully")
        }
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.data.error
        });
        toast.error('Logout Unsuccessfull')
    }
}

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    const user = localStorage.getItem('userInfo')
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        if (user == null) {
            toast.error('You must login first')
        } else {
            toast.success('Apply Successfully for this Job!')
        }
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}