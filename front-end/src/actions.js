import C from './constants';

export const loginAction = (credentials, history) => dispatch => {
    
    dispatch({
        type: C.LOGIN,
        payload: credentials.username
    });

    history.push("/");
}

export const toggleNavbarAction = () => ({ type: C.TOGGLE_NAVBAR });