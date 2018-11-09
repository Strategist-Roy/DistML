import React from 'react';
import {
    Button,
    TextField,
    withStyles,
    FormControl,
    Typography
} from '@material-ui/core';
import {
    blueGrey,
    green,
    deepPurple,
} from '@material-ui/core/colors';

const styles = theme => ({
    btn: {
        backgroundColor: green.A400,
        width: '50%',
        margin: 'auto',
        marginTop: 15,
        color: blueGrey[700],
        '&:hover': {
            backgroundColor: deepPurple[400],
            color: 'white',
        },
        transition: 'background-color 0.1s linear'
    },
    form: {
        top: '-80%',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        position: 'relative',
    },
    formControl: {
        width: '100%',
        fontSize: '1em',
        marginBottom: '16px',
        color: 'white',
    },
    textField: {
        width: '70%',
        margin: 'auto',
    }
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
            <div className={classes.form}>
                <form>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Username"
                            value={username}
                            onChange={this.handleChange.bind(this,'username')}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Password"
                            type="password"
                            value={password}
                            onChange={this.handleChange.bind(this,'password')}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button
                            className={classes.btn}
                            onClick={this.submit.bind(this)}
                        >
                            <Typography
                                variant="button"
                                color="inherit"
                            >
                                Login
                            </Typography>
                        </Button>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Login);