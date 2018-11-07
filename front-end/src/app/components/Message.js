import React from 'react';
import {
    Snackbar,
    IconButton,
    SnackbarContent
} from '@material-ui/core';

import {
    Close as CloseIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Warning as WarningIcon
} from '@material-ui/icons';

import {
    green,
    amber,
    blue,
    red
} from '@material-ui/core/colors';

import C from '../../constants';

const getBackgroundColor = (type) => {
    switch (type) {
        case C.MESSAGE_TYPES.ERROR:
            return red[500];
        case C.MESSAGE_TYPES.INFO:
            return blue[500];
        case C.MESSAGE_TYPES.SUCCESS:
            return green[500];
        case C.MESSAGE_TYPES.WARNING:
            return amber[500];
        default:
            return null;
    }
}

const Icon = ({type, ...props}) => {
    switch(type) {
        case C.MESSAGE_TYPES.ERROR:
            return <ErrorIcon {...props}/>;
        case C.MESSAGE_TYPES.INFO:
            return <InfoIcon {...props}/>;
        case C.MESSAGE_TYPES.SUCCESS:
            return <SuccessIcon {...props}/>;
        case C.MESSAGE_TYPES.WARNING:
            return <WarningIcon {...props}/>;
        default:
            return null;
    }
}

const getSnackBarStyle = (type) => ({
    overflow: 'hidden',
    position: 'absolute',
    width: 400,
    bottom: '0px',
    backgroundColor: getBackgroundColor(type)
});

export default ({ message = { type:C.NONE, payload:'',timeoutFunction: undefined }, clearMessage }) =>
    Object.keys(C.MESSAGE_TYPES).map((each,index) =>
        <Snackbar
            key={index}
            open={message.type==C.MESSAGE_TYPES[each]}
        >
            <SnackbarContent
                style={getSnackBarStyle(C.MESSAGE_TYPES[each])}
                message={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Icon 
                            type={each}
                            style={{
                                paddingRight: 10
                            }}
                        />
                        {message.text}
                    </span>
                }
                action={
                    <IconButton
                        color="inherit"
                        onClick={() => clearMessage(message.timeoutFunction)}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
    </Snackbar>);