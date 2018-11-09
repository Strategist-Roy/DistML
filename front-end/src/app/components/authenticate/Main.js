import React from 'react';
import { 
    Tabs,
    Tab,
    withStyles,
    Typography,
    Paper,
} from '@material-ui/core';
import {
    blueGrey,
    deepPurple,
} from '@material-ui/core/colors';

import Login from './Login';
import Register from './Register';

const tabVal = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
};

const TabContainer = (props) => (
    <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
    </Typography>
);

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        height: '70%',
        top: '10%',
        width: '50%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    },
    background: {
        position: 'fixed',
        padding:0,
        margin:0,
        top:0,
        left:0, 
        width: '100%',
        height: '100%',
        backgroundColor: blueGrey[100],
    },
    siteInfo: {
        top: -9,
        height: '104%',
        position: 'relative',
        width: '50%',
        backgroundColor: deepPurple[400],
    },
    tabRoot: {
        top: 10,
        position: 'relative',
        width: '50%',
        color: deepPurple[400],
    },
    tabIndicator: {
        width: '40% !important',
        marginLeft: '5%',
        backgroundColor: deepPurple[400]
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currenTab: tabVal.LOGIN
        }
    }

    handleChange(event, value) {
        this.setState({
            currenTab: value
        });
    }
    
    render()  {
        const { currenTab } = this.state;
        const { classes, ...rest } = this.props;

        return (
            <div className={classes.background}>
                <Paper className={classes.root} elevation={4}>
                    <Paper className={classes.siteInfo} elevation={4}>
                        Hello World
                    </Paper>
                    <Tabs 
                        value={currenTab}
                        onChange={this.handleChange.bind(this)}
                        fullWidth
                        centered
                        classes={{
                            root: classes.tabRoot,
                            indicator: classes.tabIndicator
                        }}
                    >
                        <Tab disableRipple disableTouchRipple value={tabVal.LOGIN} label="Login" />
                        <Tab disableRipple disableTouchRipple value={tabVal.REGISTER} label="Register" />
                    </Tabs>
                    { currenTab === 'LOGIN' && <Login {...rest} /> }
                    { currenTab === 'REGISTER' && <Register {...rest}/> }
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Main);