import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Jobs } from '../components';
import { toggleWorkingAction } from '../../actions';

const mapStateToProps = (state, props) => ({
    jobStatus: state.jobStatus.working
});

const mapDispatchToProps = dispatch => ({
    toggleWorking(jobStatus) {
        dispatch(
            toggleWorkingAction(jobStatus)
        )
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));