import C from '../constants';
import { combineReducers } from 'redux';

export const working = (state = false, action) => {

    switch(action.type) {
        case C.TOGGLE_WORK:
            return !state;
        default:
            return state;
    }
};

export const username = (state = null, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    username,
    working,
});
