import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import {
    Login,
    Dashboard
} from './containers';
import PrivateRoute from './PrivateRoute';

export default () => (
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />    {/* Seperate Page */}
                <PrivateRoute path="/" component={Dashboard} />    {/* Go inside app */}
            </Switch>
        </BrowserRouter>
    </div>
);