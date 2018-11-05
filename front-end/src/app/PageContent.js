import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import {
    Login,
    Dashboard
} from './containers';
import PrivateRoute from './PrivateRoute';

export default () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Dashboard} />
    </Switch>
);