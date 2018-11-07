import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Message } from '../components';
import { clearMessageAction } from '../../actions';

const mapStateToProps = (state, props) => ({
    message: state.uiReducer.message
});

const mapDispatchToProps = dispatch => ({
    clearMessage() {
        dispatch(
            clearMessageAction()
        )
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Message));