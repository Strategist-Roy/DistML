import C from './constants';
import api from './api';

export const loginAction = (credentials, history) => dispatch => {
    
    dispatch({
        type: C.TOGGLE_LOADING
    });
    
    api.post('user/login/', credentials)
        .then(response => {
            console.log(response.data);
            localStorage['token'] = response.data.token;
            dispatch([
                {
                    type: C.TOGGLE_LOADING,
                },
                {
                    type: C.LOGIN,
                    payload: credentials.username
                }
            ]);

            history.push("/");
        })
        .catch(error => {
            dispatch({
                type: C.TOGGLE_LOADING
            })
        });
}

export const logoutAction = () => {
    localStorage.removeItem('token');
    
    return {
        type: C.LOGIN, 
        payload: null
    }; 
};

export const toggleNavbarAction = () => ({ type: C.TOGGLE_NAVBAR });