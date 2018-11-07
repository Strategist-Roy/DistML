import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import {
    Login,
    Dashboard,
    Message
} from './containers';
import PrivateRoute from './PrivateRoute';

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />    {/* Seperate Page */}
                    <PrivateRoute path="/" component={Dashboard} />    {/* Go inside app */}
                </Switch>
                <Message />     {/* For display of messages */}
            </div>
        </BrowserRouter>
    </div>
);