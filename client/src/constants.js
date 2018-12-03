export default {

    //Action Types
    TOGGLE_WORK: 'TOGGLE_WORK',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    TOGGLE_NAVBAR: 'TOGGLE_NAVBAR',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    ADD_MESSAGE: 'ADD_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    NONE: 'NONE',      //A none-type action for special purposes
    GET_JOBS: 'GET_JOBS',

    // Other constants
    MESSAGE_TYPES: {
        SUCCESS: 'SUCCESS',
        WARNING: 'WARNING',
        INFO: 'INFO',
        ERROR: 'ERROR',
    },

    //Routes for Navbar Components
    ROUTES: {
        BALANCE: '/balance',
        JOBS: '/jobs',
        HOME: '/',
    },

    //for checking availability of username during registration
    CHECK_USERNAME_AVAILABLE: 'CHECK_USERNAME_AVAILABLE',
    USERNAME_STATUS: {
        INACTIVE: 'INACTIVE',
        TAKEN: 'TAKEN'  
    }
}