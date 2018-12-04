import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NavBar } from '../components';

import { 
    toggleNavbarAction,
    navigateAction
} from '../../actions';

const mapStateToProps = (state, props) => ({
    navbarStatus: state.uiReducer.navbarStatus,
    name: state.userState.name,
    username: state.userState.username,
    email: state.userState.email,
});

const mapDispatchToProps = dispatch => ({
    toggleNavbar() {
        dispatch(
            toggleNavbarAction()
        )
    },
    navigate(route, history) {
        dispatch(
            navigateAction(route, history)
        )
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));