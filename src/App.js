import React from 'react';
import Main from './Main';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Login from './Login';

const App = () => (
    <div className="app-routes">
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/menu" component={Main} />
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    </div>
);

export default App;