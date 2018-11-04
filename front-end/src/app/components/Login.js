import React from 'react';

import {
    Button,
    TextField,
    withStyles
} from '@material-ui/core';

const styles = theme => ({
    btn: {
        backgroundColor: 'blue'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

    }

    handleChange(attribute, event) {
        this.setState({
            [attribute]: event.target.value
        });
    }

    submit(event) {
        this.props.onLogin(this.state,this.props.history);
    }

    render() {
        const {
            username,
            password,
        } = this.state;

        const {
            classes
        } = this.props;

        return (
            <form
                className={classes.container}
            >
                <TextField
                    label="Username"
                    value={username}
                    onChange={this.handleChange.bind(this,'username')}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.handleChange.bind(this,'password')}
                />
                <Button
                    className={classes.btn}
                    onClick={this.submit.bind(this)}
                >
                    Login
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(Login);