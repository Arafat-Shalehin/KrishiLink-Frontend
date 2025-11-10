import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import Loader from '../Components/Loader';

const PrivateRoute = ({children}) => {

    const {user, loading} = use(AuthContext);

    const location = useLocation();

    if(loading) {
        return <Loader></Loader>;
    }
    if (user && user?.email) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to='/auth/login'></Navigate>;
    }
};

export default PrivateRoute;