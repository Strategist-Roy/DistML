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
        (store.getState().userState.loginState)
        ? (
            <div>
                <TopBar />        {/* The top app-bar which ought to be present globally */}
                <NavBar />        {/* The left-side drawer which ought to be present globally */}
                <div
                    style={{
                        position: 'absolute',
                        top: '80px'
                    }}
                >
                    <Component {...props} />  {/* Loads component based on Routing */}
                </div>
            </div>
        )
        : <Redirect to="/login" />
    )} />
);