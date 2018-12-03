import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Jobs from '../components/jobs/Main';
import { 
    toggleWorkingAction,
    datasetUploadAction,
    downloadModelAction,
} from '../../actions';

const mapStateToProps = (state, props) => ({
    jobStatus: state.jobStatus.working,
    jobs: state.jobStatus.jobs,
});

const mapDispatchToProps = dispatch => ({
    toggleWorking(jobStatus) {
        dispatch(
            toggleWorkingAction(jobStatus)
        )
    },
    datasetUpload(dataset) {
        dispatch(
            datasetUploadAction(dataset)
        )
    },
    downloadModel(job) {
        dispatch(
            downloadModelAction(job)
        )
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));