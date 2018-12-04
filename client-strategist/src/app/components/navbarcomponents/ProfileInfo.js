import React from 'react';
import {
    Avatar,
    withStyles,
    Typography
} from '@material-ui/core';

import baseUrl from '../../../baseUrl';
import Image from '../../images/profilebackground.jpg';

const styles = {
    root: {
        height: 240,
        backgroundImage: `url(${Image})`,
        width: 300,
    },
    nameHeading: {
        position: 'relative',
        top: 50,
        left: 25,
        textAlign: 'center',
        color: 'white'
    },
    profilePhoto: {
        position: 'relative',
        top: 25,
        left: 25,
        height: 120,
        width: 120,
    }
};

export default withStyles(styles)(({name, email, username, classes}) => (
    <div className={classes.root}>
        <Avatar 
            alt={name} 
            src={baseUrl+'media/'+username+'/userdata/profile.jpg'} 
            className={classes.profilePhoto}    
        />
        <div className={classes.nameHeading}>
            <Typography 
                variant='body1'
                align='left' 
                gutterBottom
                color='inherit'
            >
                {name}</Typography>
            <Typography
                variant='body2'
                align='left'
                gutterBottom
                color='inherit'
            >
                 {email}
            </Typography>
        </div>
    </div>
));