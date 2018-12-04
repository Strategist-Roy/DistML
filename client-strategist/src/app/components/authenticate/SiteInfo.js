import React from 'react';
import { 
    withStyles,
    Typography,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core';
import {
    blue
} from '@material-ui/core/colors';

import Image from '../../images/distml.jpg';

const styles = {
    root: {
        width: '100%',
        margin: 'auto',
        height: '100%',
        position: 'relative'
    },
    photo: {
        height: '80%',
        position: 'relative',
        textAlign: 'center',
    },
    text: {
        marginTop: '7%',
        color: blue[900],
    }
};

export default withStyles(styles)(({classes}) => (
    <div className={classes.root}>
        <div className={classes.photo}>
            <img src={Image}
                style={{
                    maxHeight: '100%',
                    maxWidth: '100%'
                }}
            />
        </div>
        <div className={classes.text}>
            <Typography variant="button" align="center" color="inherit">
                DistML
            </Typography>
            <Typography variant="subtitle2" align="center" color="inherit">
                The distributed Machine Learning Platform
            </Typography>
        </div>
    </div>
));