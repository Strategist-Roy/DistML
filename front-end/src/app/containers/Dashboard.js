import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Dashboard from '../components/Dashboard';

const mapStateToProps = (state, props) => ({
    username: state.username
});

const mapDispatchToProps = dispatch => ({

});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default withRouter(DashboardContainer);