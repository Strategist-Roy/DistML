import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { TopBar } from '../components';
import { toggleNavbarAction, logoutAction } from '../../actions';

const mapStateToProps = (state,props) => ({

});

const mapDispatchToProps = dispatch => ({
    toggleNavbar() {
        dispatch(
            toggleNavbarAction()
        )
    },
    logout() {
        dispatch(
            logoutAction()
        )
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));