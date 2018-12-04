import React from 'react';

import {
    withStyles,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    IconButton,
    Tooltip
} from '@material-ui/core';

import {
    ArrowUpward as UploadIcon,
    Cached as ProcessingIcon
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
    uploadBtn: {
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

class JobList extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
    }

    uploadFile = (job) => {

        var formData = new FormData();
        formData.append('test_data', event.target.files[0]);
        formData.append('job_id', job);

        this.props.testDataUpload(formData, this.props.history);
        this.fileInput.current.value = '';
    }

    componentDidMount() {
        this.props.getJobStatus();
    }

    render() {
        const { jobs, classes } = this.props;

        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Job ID</CustomTableCell>
                        <CustomTableCell>Status</CustomTableCell>
                        <CustomTableCell>Accuracy</CustomTableCell>
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
                                    <IconButton
                                        disableRipple
                                        disableTouchRipple
                                        className={classes.uploadBtn}
                                        component='label'
                                    >   
                                        <Tooltip title='Check Accuracy'>
                                            <UploadIcon />
                                        </Tooltip>
                                        <input
                                            ref={this.fileInput}
                                            onChange={() => this.uploadFile(each.job)}
                                            style={{ display: 'none' }}
                                            type="file"
                                        />
                                    </IconButton>
                                    :
                                    <ProcessingIcon style={{ color: lightBlue[500] }} />
                                }                    
                            </CustomTableCell>
                            <CustomTableCell>
                                {each.accuracy}%
                            </CustomTableCell>
                        </TableRow>
                    )
                )}
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(JobList);