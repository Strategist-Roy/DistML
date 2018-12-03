import React from 'react';

import {
    withStyles,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    IconButton
} from '@material-ui/core';

import {
    ArrowDownward as DownloadIcon,
    Done as DoneIcon
} from '@material-ui/icons';

import {
    deepPurple,
    green,
    lightBlue
} from '@material-ui/core/colors';

const styles = theme => ({
    table: {
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    downloadBtn: {
        color: lightBlue[500],
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
});

const CustomTableCell = withStyles(theme => ({
    root: {
        textAlign: 'center',
        fontSize: 14,
    },
    head: {
        backgroundColor: deepPurple[400],
        color: theme.palette.common.white,
    },
    body: {
        
    },
}))(TableCell);

export default withStyles(styles)(({ jobs, downloadModel, classes }) => (
    <Table className={classes.table}>
        <TableHead>
            <TableRow>
                <CustomTableCell>Job ID</CustomTableCell>
                <CustomTableCell>Download Model</CustomTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {jobs.map((each,index) => 
            (
                <TableRow className={classes.row} key={index}>
                    <CustomTableCell component="th" scope="row">
                        {each.job}
                    </CustomTableCell>
                    <CustomTableCell>
                        {each.summarized ?                            
                            <DoneIcon style={{ color: green[500]}} />
                            :
                            <IconButton
                                disableRipple
                                disableTouchRipple
                                className={classes.downloadBtn}
                                onClick={() => downloadModel(each.job)}
                            >
                                <DownloadIcon />                      
                            </IconButton>
                        }                    
                    </CustomTableCell>
                </TableRow>
            )
        )}
        </TableBody>
    </Table>
));