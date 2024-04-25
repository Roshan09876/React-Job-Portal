import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import loadJobTypeReducer from "./reducers/JobtypeRedcer"
import { allUserReducer, userApplyJobReducer, userReducerLogOut, userReducerProfile, userReducerSignIn } from "./reducers/UserReducer";
import { thunk } from "redux-thunk";
import { loadJobReducer, loadJobSingleReducer } from "./reducers/Jobreducer";

// Combine Reducers 
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogOut,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer
});


// Load initial user info from localStorage
const initialUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// Initial State
let initialState = {
  signIn: {
    userInfo: initialUserInfo,
  },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
