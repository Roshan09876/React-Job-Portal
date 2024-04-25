import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const AdminRoutes = ({ children }) => {
    const {userInfo} = useSelector((state) => state.signIn);
    const isAdmin = userInfo && userInfo.role == 1;
    return isAdmin ? children : <Navigate to='/login' />
}

export default AdminRoutes