import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import {
    Authenticate,
    Dashboard,
    AccountBalance,
    Message,
    Jobs
} from './containers';
import PrivateRoute from './PrivateRoute';

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/login" component={Authenticate} />    {/* Seperate Page */}
                    <PrivateRoute exact path="/" component={Dashboard} />    {/* Go Dashboard */}
                    <PrivateRoute path="/balance" component={AccountBalance} />  {/* Go AccountBalance */}
                    <PrivateRoute path="/jobs" component={Jobs} />    {/* Jobs Portal */}
                </Switch>
                <Message />     {/* For display of messages */}
            </div>
        </BrowserRouter>
    </div>
);