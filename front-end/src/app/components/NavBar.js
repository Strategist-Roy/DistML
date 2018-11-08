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

const styles = {
    //put styles in here in future
};

export default withStyles(styles)(({ navbarStatus, name, toggleNavbar, ...props }) => (
    <Drawer open={navbarStatus} onClose={() => {console.log(props),toggleNavbar()}}>
        <div>
            <ProfileInfo />
            <Divider />
            <Functionalities {...props} />
            <Divider />
            <Miscellaneous {...props}/>
        </div>
    </Drawer>
));