import C from './constants';
import api from './api';

export const clearMessageAction = () => ({ type: C.CLEAR_MESSAGE });

export const loginAction = (credentials, history) => dispatch => {
    
    dispatch({
        type: C.TOGGLE_LOADING
    });
    
    api.post('user/login/', credentials)
        .then(response => {
            dispatch([
                {
                    type: C.TOGGLE_LOADING,
                },
                {
                    type: C.LOGIN,
                    payload: {
                        username: credentials.username,
                        token: response.data.token
                    }
                }
            ]);

            history.push("/");
        })
        .catch(error => {
            dispatch([
                {
                    type: C.TOGGLE_LOADING
                },
                {
                    type: C.ADD_MESSAGE,
                    payload: {
                        type: C.MESSAGE_TYPES.ERROR,
                        text: 'Login Failed. Check credentials!!'
                    }
                },
            ]);

            setTimeout(() => dispatch(clearMessageAction()),2000);
        });
}

export const logoutAction = (history) => dispatch => {
    
    dispatch({
        type: C.LOGOUT,
    });

    history.push("/");
};

export const toggleNavbarAction = () => ({ type: C.TOGGLE_NAVBAR });