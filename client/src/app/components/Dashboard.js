import React from 'react';
import {
    Button
} from '@material-ui/core';

import axios from 'axios';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textMessage: ''
        };
    }

    handleClick() {
        // axios.get('http://127.0.0.1:5000/')
        // .then(response => {
        //     this.setState({
        //         textMessage: response.data.text
        //     });
        // })
        // .catch(error => {
        //     console.log(error);
        // })

        const electron = window.require('electron');
        // const fs = electron.remote.require('fs');
        const ipcRenderer  = electron.ipcRenderer;

        // const { ipcRenderer } = require('electron');

        
    }

    render() {
        const { username } = this.props;

        return (
            <div>
                Hi { username }
                <Button onClick={this.handleClick.bind(this)}>
                    Run Python
                </Button>
                <p>{ this.state.textMessage }</p>
            </div>
        );
    }
}

export default Dashboard;