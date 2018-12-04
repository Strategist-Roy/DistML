import React from 'react';
import {
    withStyles
} from '@material-ui/core';

import { 
    Route,
    Redirect
} from 'react-router-dom';

import {
    TopBar,
    NavBar
} from './containers';

const styles = theme => ({
    component: {
        position: 'absolute',
        top: '80px',
        width: '90%',
        left: '5%',
        height: 'calc(100% - 80px)'
    }
});

export default withStyles(styles)(({ component: Component, classes, ...rest }) => (
    <Route {...rest} render={(props) => (
        (store.getState().userState.loginState)
        ? (
            <div>
                <TopBar />        {/*The top app-bar which ought to be present globally */}
                <NavBar />        {/*The left-side drawer which ought to be present globally */}
                <div className={classes.component}>
                    <Component {...props} />  {/* Loads component based on Routing */}
                </div>
            </div>
        )
        : <Redirect to="/login" />
    )} />
));