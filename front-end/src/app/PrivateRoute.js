import React from 'react';

import { 
    Route,
    Redirect
} from 'react-router-dom';

import {
    TopBar,
    NavBar
} from './containers';

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (store.getState().username)
        ? (
            <div>
                <TopBar />        {/* The top app-bar which ought to be present globally */}
                <NavBar />        {/* The left-side drawer which ought to be present globally */}
                <Component {...props} />  {/* Loads component based on Routing */}
            </div>
        )
        : <Redirect to="/login" />
    )} />
);