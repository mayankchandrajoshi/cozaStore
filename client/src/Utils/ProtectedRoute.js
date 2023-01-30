import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom'
import Loader from '../Components/Loader/Loader';

const ProtectedRoute = () => {

    const {isLoadingUser, isAuthenticated } = useSelector((state) => state.user);
    
    if(isLoadingUser) return <div className="w-screen h-screen flex"><Loader/></div>;
    if(isAuthenticated) return <Outlet/>;
    return <Navigate replace to={"/login"}/>;
}

export default ProtectedRoute