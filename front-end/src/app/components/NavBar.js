import React from 'react';
import { 
    withStyles,
    Drawer,
    Divider,
} from '@material-ui/core';

import {
    Functionalities,
    ProfileInfo,
    Miscellaneous
} from './navbarcomponents';

const styles = theme => ({
    paper: {
        overflowX: 'hidden'
    }
});

export default withStyles(styles)(({ navbarStatus, toggleNavbar, classes, ...props }) => (
    <Drawer 
        open={navbarStatus} 
        onClose={() => {toggleNavbar()}}
        classes={{
            paper: classes.paper
        }}
    >
        <div className={classes.root}>
            <ProfileInfo {...props}/>
            <Divider />
            <Functionalities {...props} />
            <Divider />
            <Miscellaneous {...props}/>
        </div>
    </Drawer>
));