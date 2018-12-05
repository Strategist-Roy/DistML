import React from 'react';
import classNames from 'classnames';

import {
    Typography,
    withStyles,
    IconButton,
} from '@material-ui/core';
import {
    CloudUpload as UploadIcon
} from '@material-ui/icons';
import {
    blue,
    lightBlue
} from '@material-ui/core/colors';

const styles = theme => ({
    buttonContainer: {
        // position: 'relative',
        height: '160px',
        // top: 'calc((100% - 100px)/2)',
        textAlign: 'center',
        margin: 20,
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    uploadBtn: {
        color: blue[600],
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    icon: {
        height: 80,
        width: 80
    },
    workText: {
        marginTop: 15,
    }
});

class UploadDataset extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
    }

    uploadFile = (event) => {
        event.preventDefault();

        var formData = new FormData();
        formData.append('dataset', event.target.files[0]);

        this.props.datasetUpload(formData);
        this.fileInput.current.value = '';
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.buttonContainer}>
                <IconButton
                    disableRipple
                    disableTouchRipple
                    component='label'
                    className={classes.uploadBtn}
                >
                    <UploadIcon 
                        className={classes.icon}
                    />
                    <input
                        ref={this.fileInput}
                        onChange={this.uploadFile}
                        style={{ display: 'none' }}
                        type="file"
                    />
                </IconButton>
                <Typography
                    variant="h5" 
                    className={classes.workText}
                    style={{
                        color: lightBlue[400]
                    }}
                >
                    Upload Dataset
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(UploadDataset);