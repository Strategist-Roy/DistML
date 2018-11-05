import React from 'react';
import { 
    withStyles,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@material-ui/core';

import {
    MoveToInbox as InboxIcon,
    Mail as MailIcon
} from '@material-ui/icons';

const sideList = (
    <div>
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    </div>
);

export default ({ navbarStatus, toggleNavbar}) => (
    <Drawer open={navbarStatus} onClose={() => toggleNavbar()}>
        {sideList}
    </Drawer>
);