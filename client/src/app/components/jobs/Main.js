import React from 'react';
import {
    Grid
} from '@material-ui/core';

import Work from './Work';
import UploadDataset from './UploadDataset';

export default ({ jobStatus, toggleWorking, datasetUpload }) => (
    <Grid 
        container 
        spacing={16}
        style={{
            flexGrow: 1,
            height: '100%'
        }}
    >
        <Grid item xs={6}>
            <Work jobStatus={jobStatus} toggleWorking={toggleWorking} />
        </Grid>
        <Grid item xs={6}>
            <UploadDataset datasetUpload={datasetUpload} />
        </Grid>
    </Grid>
);