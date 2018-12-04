import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Dashboard } from '../components';

const mapStateToProps = (state, props) => ({
    username: state.username
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));