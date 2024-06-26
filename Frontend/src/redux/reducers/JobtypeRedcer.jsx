import { JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS, JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_RESET } from "../constants/JobtypeConstants"

//all the actions are not same it might be different
const loadJobTypeReducer = (state = { jobType: [] }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { loading: true }
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT
            }
        case JOB_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

export default loadJobTypeReducer;