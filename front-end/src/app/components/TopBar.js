import React from 'react';

import {
    AppBar,
    Toolbar,
    IconButton,
    withStyles,
    Typography
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    PowerSettingsNew as LogoutIcon
} from '@material-ui/icons';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        color: "white"
    },
    appName: {
        flexGrow: 1,
        color: "white",
        marginLeft: "2%"
    },
};

export default withStyles(styles)(({classes, logout, toggleNavbar, history}) => (
    <div className={classes.root}>
        <AppBar>
            <Toolbar>
                <IconButton 
                    className={classes.menuButton}
                    onClick={() => toggleNavbar()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" className={classes.appName}>
                    DistML
                </Typography>
                <IconButton 
                    className={classes.menuButton}
                    onClick={() => logout(history)}
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </div>
));