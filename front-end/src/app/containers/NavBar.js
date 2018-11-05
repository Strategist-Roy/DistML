import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NavBar } from '../components';

import { toggleNavbarAction } from '../../actions';

const mapStateToProps = (state, props) => ({
    navbarStatus: state.navbarStatus
});

const mapDispatchToProps = dispatch => ({
    toggleNavbar() {
        dispatch(
            toggleNavbarAction()
        )
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));