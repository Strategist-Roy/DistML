import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AccountBalance } from '../components';

const mapStateToProps = (state, props) => ({

});

const mapDispatchToProps = dispatch => ({
    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountBalance));