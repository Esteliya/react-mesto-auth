import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
    return (
        //авторизированы? идем в компонент : нет -> надо залогиниться
        props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up" replace/>
    )
}
export default ProtectedRoute;