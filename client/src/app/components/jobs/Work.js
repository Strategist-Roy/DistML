import React from 'react';
import {
    IconButton,
    withStyles,
    CircularProgress,
    Typography
} from '@material-ui/core';
import {
    PowerSettingsNew as WorkIcon
} from '@material-ui/icons';
import {
    red,
    green,
    lightBlue
} from '@material-ui/core/colors';

const styles = theme => ({
    buttonContainer: {
        position: 'relative',
        height: '100px',
        top: 'calc((100% - 100px)/2)',
        textAlign: 'center',
    },
    icon: {
        width: 80,
        height: 80
    },
    working: {
        height: '120px !important',
        width: '120px !important',
        position: 'fixed',
        color: lightBlue[200]
    },
    workText: {
        marginTop: 15,
    }
});

export default withStyles(styles)(({ jobStatus, toggleWorking, classes}) => (
    <div className={classes.buttonContainer}>
        <IconButton
            disableRipple
            disableTouchRipple
            onClick={() => toggleWorking(jobStatus)}
        >

            <WorkIcon 
                className={classes.icon}
                style={{
                    color: jobStatus ? red[400] : green[400]
                }}
            />                
        {jobStatus == true && 
            <CircularProgress className={classes.working} />
        }
        </IconButton>
        {jobStatus ?
            <Typography 
                variant="h5" 
                className={classes.workText}
                style={{
                    color: red[400]
                }}
            >
                Stop
            </Typography>:
            <Typography 
                variant="h5" 
                className={classes.workText}
                style={{
                    color: green[400]
                }}
            >
                Start
            </Typography>                
        }        
    </div>
));