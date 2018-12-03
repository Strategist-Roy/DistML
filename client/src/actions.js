import C from './constants';
import api from './api';

export const clearMessageAction = (timeoutFunction=undefined) => {
    clearTimeout(timeoutFunction);
    return {
        type: C.CLEAR_MESSAGE 
    };
}

export const registerAction = (userdata, history) => dispatch => {

    //check if any field is empty or not
    var checkValid = true;

    for (var key in userdata) {
        if (userdata[key]=='')
            checkValid=false;
    }
    
    if (checkValid) {    
        dispatch({
            type: C.TOGGLE_LOADING
        });

        api.post('user/register/', userdata)
            .then(response => {
                dispatch([
                    {
                        type: C.TOGGLE_LOADING,
                    },
                    {
                        type: C.LOGIN,          //perform login immediately
                        payload: {
                            username: userdata.username,
                            token: response.data.token,
                            name: userdata.name,
                            email: userdata.email
                        }
                    },
                    {
                        type: C.ADD_MESSAGE,
                        payload: {
                            type: C.MESSAGE_TYPES.SUCCESS,
                            text: 'You have registered successfully',
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
                            text: 'Registration Failed ! Retry',
                            timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                        }
                    },
                ]);
            });
    }
    else {
        dispatch({
            type: C.ADD_MESSAGE,
            payload: {
                type: C.MESSAGE_TYPES.ERROR,
                text: 'Some Fields are empty!!',
                timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
            }
        })
    }
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
                        //load all sort of data upon login
                        username: credentials.username,
                        token: response.data.token,
                        name: response.data.name,
                        email: response.data.email,
                        jobs: response.data.jobs   
                    }
                },
                {
                    type: C.ADD_MESSAGE,
                    payload: {
                        type: C.MESSAGE_TYPES.SUCCESS,
                        text: 'Welcome ' + response.data.name,
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
                        text: 'Login Failed. Check credentials !!',
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

export const checkUsernameAvailableAction = (username) => dispatch => {

    if (username=='') {
        dispatch({
            type: C.CHECK_USERNAME_AVAILABLE,
            payload: C.USERNAME_STATUS.INACTIVE
        });
    }
    else {
        api.get('user/check_username_available/',
            {
                params: {
                    username: username
                }
            })
            .then(response => {
                if (!response.data.available) {                    
                    dispatch({
                        type: C.CHECK_USERNAME_AVAILABLE,
                        payload: C.USERNAME_STATUS.TAKEN
                    });
                }
                else {
                    dispatch({
                        type: C.CHECK_USERNAME_AVAILABLE,
                        payload: C.USERNAME_STATUS.INACTIVE
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: C.CHECK_USERNAME_AVAILABLE,
                    payload: C.USERNAME_STATUS.INACTIVE
                });
            });
    }
};

export const toggleWorkingAction = (jobStatus) => {
    const { ipcRenderer } = window.require('electron');

    //ask main process to toggle child_process
    ipcRenderer.send('toggle-work', !jobStatus);

    return { type: C.TOGGLE_WORK };
};

export const datasetUploadAction = (dataset) => dispatch => {
    
    dispatch({ type: C.TOGGLE_LOADING });

    api.post('ml/dataset_upload/', dataset, { headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            dispatch([
                {
                    type: C.TOGGLE_LOADING
                },
                {
                    type: C.ADD_MESSAGE,
                    payload: {
                        type: C.MESSAGE_TYPES.SUCCESS,
                        text: 'Dataset Uploaded Successfully',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                    }
                }
            ])
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
                        text: 'Dataset Upload Failed',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                    }
                }
            ])
        });
}

export const downloadModelAction = (job) => dispatch => {

    dispatch({ type: C.TOGGLE_LOADING });

    // const { ipcRenderer } = window.require('electron');

    // //ask main process to toggle child_process
    // ipcRenderer.send('toggle-work', !jobStatus);

    // return { type: C.TOGGLE_WORK };

    api.post('ml/summarize/', { job_id : job })
        .then(response => {
            dispatch([
                { 
                    type: C.TOGGLE_LOADING 
                },
                {
                    type: C.FLIP_JOB_STATUS,
                    payload: job
                },
                {
                    type: C.ADD_MESSAGE,
                    payload: {
                        type: C.MESSAGE_TYPES.SUCCESS,
                        text: 'Model Downloaded Successfully',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                    }
                }
            ]);
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
                        text: 'Model Summarization Failed',
                        timeoutFunction: setTimeout(() => dispatch(clearMessageAction()),2000)
                    }
                }
            ])
        });

    dispatch({ type: C.TOGGLE_LOADING });
}
