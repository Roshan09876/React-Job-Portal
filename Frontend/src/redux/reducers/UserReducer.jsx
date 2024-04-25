import {
    LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAIL,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
    USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOAD_RESET, USER_LOAD_FAIL,
    USER_APPLY_JOB_REQUEST, USER_APPLY_JOB_SUCCESS, USER_APPLY_JOB_FAIL, USER_APPLY_JOB_RESET,
    ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, ALL_USER_LOAD_RESET, ALL_USER_LOAD_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_DELETE_SUCCESS
} from '../constants/UserConstant'

//After getting response from action we are storing userReducer store the value //
//in JSON of User fo Reducer which comes after triggering the action

export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                // user: action.payload,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        default:
            return state;
    }

}

//user profile
export const userReducerProfile = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
        case USER_LOAD_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
            }
        case USER_LOAD_FAIL:
            return { loading: false, user: null, error: action.payload }
        case USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//User LogOut Reducer
export const userReducerLogOut = (state = {}, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { loading: true }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

//  apply for a job reducer
export const deleteUser = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                userJob: action.payload,
            }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

//  apply for a job reducer
export const userApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_APPLY_JOB_REQUEST:
            return { loading: true }
        case USER_APPLY_JOB_SUCCESS:
            return {
                loading: false,
                userJob: action.payload,
            }
        case USER_APPLY_JOB_FAIL:
            return { loading: false, error: action.payload }
        case USER_APPLY_JOB_RESET:
            return {}
        default:
            return state;
    }

}

//all user reducer
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_USER_LOAD_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
            }
        case ALL_USER_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}
