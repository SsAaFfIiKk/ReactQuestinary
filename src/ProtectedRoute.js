import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
            localStorage.getItem("token") ? (
                    children
                ) : (
                    // <Redirect
                    //     to={{
                    //         pathname: "/login",
                    //         state: { from: location }
                    //     }}
                    // />
                    <Login to={location} />
                )}
        />
    );
};

export default ProtectedRoute;