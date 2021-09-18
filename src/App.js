import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Sidemenu from "./SideMenu"

export default function App() {
    return (
        <Router basename="/questionnaires">
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <ProtectedRoute path="/menu">
                    <Sidemenu />
                </ProtectedRoute>
                <Route exact path="/">
                    <Redirect exact from="/" to="menu" />
                </Route>
                <Route path="*">
                    <Redirect from="/" to="menu" />
                </Route>
            </Switch>
        </Router>
    )
}