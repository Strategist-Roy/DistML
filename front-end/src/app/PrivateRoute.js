import React from 'react';

import { 
    Route,
    Redirect
} from 'react-router-dom';

import store from '../store/index';

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (store.getState().username)
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
);