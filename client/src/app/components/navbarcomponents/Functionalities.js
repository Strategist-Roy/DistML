import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

import {
    AccountBalanceWallet as BalanceIcon,
    Work as JobsIcon,
    Home as HomeIcon
} from '@material-ui/icons';

import C from '../../../constants';

export default ({ navigate, history }) => (
    <List>
        <ListItem button onClick={() => navigate(C.ROUTES.HOME, history)}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate(C.ROUTES.BALANCE, history)}>
            <ListItemIcon>
                <BalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Account Balance" />
        </ListItem>
        <ListItem button onClick={() => navigate(C.ROUTES.JOBS, history)}>
            <ListItemIcon>
                <JobsIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs"/>
        </ListItem>
    </List>
);