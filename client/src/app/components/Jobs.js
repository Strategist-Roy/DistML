import React from 'react';
import {
    Button
} from '@material-ui/core';

export default ({ jobStatus, toggleWorking }) => (
    <Button
        onClick={() => toggleWorking(jobStatus)}
    >
        {jobStatus ? <span>Stop</span> : <span>Start</span>}
    </Button>
);