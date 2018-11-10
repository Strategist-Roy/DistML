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
    red,
} from '@material-ui/core/colors';

import C from '../../../constants';

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
        top: '-85%',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            top: '-87%'
        },
    },
    formControl: {
        width: '100%',
        fontSize: '1em',
        marginBottom: '16px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px'
        },
        color: 'white',
    },
    textField: {
        width: '70%',
        margin: 'auto',
    },
    alertTaken: {
        color: red[500],
        marginLeft: '15%',
    }
});

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            passwordMatch: true,
            validEmail: true,
        };

    }

    componentDidMount() {
        //send empty username for resetting the icon flags upon reload
        this.props.checkUsernameAvailable(this.state.username);
    }

    handleChange(attribute, event) {
        this.setState({
            [attribute]: event.target.value
        });
    }

    submit(event) {
        const userdata = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
        };

        this.props.onRegister(userdata,this.props.history);
    }

    isUsernameAvailable() {
        this.props.checkUsernameAvailable(this.state.username);
    }

    matchPasswords() {
        const {
            password,
            confirmPassword
        } = this.state;

        if (confirmPassword!='' && confirmPassword!=password) {
            this.setState({ passwordMatch: false });
        }
        else {
            this.setState({ passwordMatch: true });
        }
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email } = this.state;

        if (email!='') {
            this.setState({
                validEmail: re.test(String(this.state.email).toLowerCase())
            });
        }
    }

    render() {
        const {
            username,
            password,
            confirmPassword,
            email,
            passwordMatch,
            validEmail,
            name
        } = this.state;

        const {
            classes,
            usernameAvailable
        } = this.props;

        return (
            <div className={classes.form}>
                <form>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Username"
                            value={username}
                            inputProps={{
                                onBlur: this.isUsernameAvailable.bind(this)
                            }}
                            onChange={this.handleChange.bind(this,'username')}
                        />
                        {usernameAvailable === C.USERNAME_STATUS.TAKEN &&
                            <Typography variant="caption" className={classes.alertTaken}>username already taken</Typography>
                        }
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Name"
                            value={name}
                            onChange={this.handleChange.bind(this,'name')}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Password"
                            type="password"
                            value={password}
                            onChange={this.handleChange.bind(this,'password')}
                            inputProps={{
                                onBlur: this.matchPasswords.bind(this)
                            }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={this.handleChange.bind(this,'confirmPassword')}
                            inputProps={{
                                onBlur: this.matchPasswords.bind(this)
                            }}
                        />
                        {passwordMatch==false && 
                            <Typography variant="caption" className={classes.alertTaken}>passwords don't match</Typography>
                        }
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.textField}
                            label="Email"
                            type="email"
                            value={email}
                            onChange={this.handleChange.bind(this,'email')}
                            inputProps={{
                                onBlur: this.validateEmail.bind(this)
                            }}
                        />
                        {validEmail==false && 
                            <Typography variant="caption" className={classes.alertTaken}>Invalid Email</Typography>
                        }
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
                                Register
                            </Typography>
                        </Button>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Register);