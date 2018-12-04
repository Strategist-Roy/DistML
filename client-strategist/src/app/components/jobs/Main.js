import React from 'react';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

import Work from './Work';
import UploadDataset from './UploadDataset';
import JobList from './JobList';

const styles = theme => ({
    container: {
        position: 'relative',
        top: 'calc((100% - 400px)/2)',
    },
});

export default withStyles(styles)(({ jobStatus, 
                                        jobs, 
                                        toggleWorking, 
                                        datasetUpload,
                                        getJobStatus,
                                        testDataUpload,
                                        classes, ...rest }) => (
    <Grid 
        container 
        spacing={16}
        style={{
            flexGrow: 1,
            height: '100%'
        }}
    >
        <Grid item xs={6}>
            <div className={classes.container}>
                <Work jobStatus={jobStatus} toggleWorking={toggleWorking} />
                <UploadDataset datasetUpload={datasetUpload} />
            </div>
        </Grid>
        <Grid item xs={6}>
            <JobList jobs={jobs} 
                testDataUpload={testDataUpload} 
                getJobStatus={getJobStatus} 
                {...rest}
            />
        </Grid>
    </Grid>
));