import C from './constants';
import api from './api';

export const clearMessageAction = (timeoutFunction=undefined) => {
    clearTimeout(timeoutFunction);
    return {
        type: C.CLEAR_MESSAGE 
    };
}

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
                        token: response.data.token,
                        name: response.data.name,
                    }
                },
                {
                    type: C.ADD_MESSAGE,
                    payload: {
                        type: C.MESSAGE_TYPES.SUCCESS,
                        text: 'Welcome ' + response.data.name + '!',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
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
                        text: 'Login Failed. Check credentials!!',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                    }
                },
            ]);
        });
}

export const logoutAction = (history) => dispatch => {
    
    dispatch([
        {
            type: C.LOGOUT,
        },
        {
            type: C.ADD_MESSAGE,
            payload: {
                type: C.MESSAGE_TYPES.INFO,
                text: 'You have logged out',
                timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
            }
        }
    ]);

    history.push("/");
};

export const toggleNavbarAction = () => ({ type: C.TOGGLE_NAVBAR });

export const navigateAction = (route, history) => dispatch => {
    history.push(route);
    dispatch(toggleNavbarAction())
};