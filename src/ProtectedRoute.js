import React from "react";
import { Route } from "react-router-dom";
import Login from "./pages/Login";

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
            localStorage.getItem("token") ? (
                    children
                ) : (
                    <Login to={location} />
                )}
        />
    );
};

export default ProtectedRoute;