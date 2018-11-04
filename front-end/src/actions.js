import C from './constants';

export const login = (credentials, history) => dispatch => {
    
    dispatch({
        type: C.LOGIN,
        payload: credentials.username
    });

    history.push("/");
}