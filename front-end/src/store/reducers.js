import C from '../constants';
import { combineReducers } from 'redux';

const working = (state = false, action) => {

    switch(action.type) {
        case C.TOGGLE_WORK:
            return !state;
        default:
            return state;
    }
};

const username = (state = null, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload.username;
        case C.LOGOUT:
            return null;
        default:
            return state;
    }
}

const email = (state = null, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload.email;
        case C.LOGOUT:
            return null;
        default:
            return state;
    }
}

const name = (state = null, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload.name;
        case C.LOGOUT:
            return null;
        default:
            return state;
    }
}

const token = (state = null, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload.token;
        case C.LOGOUT:
            return null;
        default:
            return state;
    }
}

const loginState = (state = false, action) => {
    switch(action.type) {
        case C.LOGIN:
            return true;
        case C.LOGOUT:
            return false;
        default:
            return state;
    }
}

const loading = (state = false, action) => {
    switch(action.type) {
        case C.TOGGLE_LOADING:
            return !state;
        default:
            return state;
    }
}

const navbarStatus = (state = false, action) => {
    switch(action.type) {
        case C.TOGGLE_NAVBAR:
            return !state;
        default:
            return state;
    }
}

const defaultMessage = {
    type: C.NONE,
    payload: '',
    timeoutFunction: undefined
}

const message = (state = defaultMessage, action) => {
    switch(action.type) {
        case C.ADD_MESSAGE:
            return action.payload;
        case C.CLEAR_MESSAGE:
            return defaultMessage;
        default:
            return state;
    }
}

export default combineReducers({
    userState: combineReducers({
        loginState,
        username,
        token,
        name,
        email
    }),
    uiReducer: combineReducers({
        loading,
        navbarStatus,
        message,
    }),
    working,
});
