import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

import {
    Settings as AccountSettingsIcon,
    Help as HelpIcon
} from '@material-ui/icons';

export default ({}) => (
    <List>
        <ListItem button onClick={() => console.log("You clicked Me 1!!")}>
            <ListItemIcon>
                <AccountSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
        </ListItem>
        <ListItem button onClick={() => console.log("You clicked Me 2!!")}>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help"/>
        </ListItem>
    </List>
)