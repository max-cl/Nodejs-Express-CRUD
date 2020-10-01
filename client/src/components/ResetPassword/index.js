import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// Constants
import { RESET_PASSWORD, UPDATE_PASSWORD_VIA_EMAIL } from '../../redux/apis';

// Styles
import { styles } from './styles';

const title = {
    pageTitle: 'Password Reset Screen',
};

class ResetPassword extends Component {
    state = {
        username: '',
        password: '',
        updated: false,
        isLoading: true,
        messageFromServer: '',
        statusResponse: null
    };

    async componentDidMount() {
        const {
            match: {
                params: { token }
            }
        } = this.props;

        try {
            const response = await axios.get(`${RESET_PASSWORD}/${token}`);
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    username: response.data.username,
                    updated: false,
                    isLoading: false
                });
            }
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                updated: false,
                isLoading: false,
                statusResponse: error.response.status,
                messageFromServer: error.response.data
            });
        }
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updatePassword = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const {
            match: {
                params: { token },
            },
        } = this.props;
        try {
            const response = await axios.put(`${UPDATE_PASSWORD_VIA_EMAIL}`,
                {
                    username,
                    password,
                    resetpasswordtoken: token,
                },
            );
            console.log(response.data);
            if (response.status === 200) {
                this.setState({
                    updated: true,
                    statusResponse: response.status,
                    messageFromServer: response.data
                });
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 403) {
                this.setState({
                    statusResponse: error.response.status,
                    messageFromServer: error.response.data
                });
            } else if (error.response.status === 404) {
                this.setState({
                    statusResponse: error.response.status,
                    messageFromServer: error.response.data
                });
            } else if (error.response.status === 422) {
                this.setState({
                    statusResponse: error.response.status,
                    messageFromServer: error.response.data
                });
            }
        }
    };

    render() {
        const { password, isLoading, updated, statusResponse, messageFromServer } = this.state;
        const { classes } = this.props;

        
        return (
            <Fragment>
                <div className="header">
                    <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography component="h1" variant="subtitle1">
                        {title.pageTitle || 'Page Title Placeholder'}
                        </Typography>
                    </Toolbar>
                    </AppBar>
                </div>
                <Grid className={classes.container}>
                    <Paper className={classes.paper}>

                        {
                            statusResponse === 403 && (
                                <div className={classes.containerContent}>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                        {messageFromServer}
                                    </Typography>
                                    <div className={classes.containerButton}>
                                        <Link to="/" className={classes.link}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                Go Home
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className={classes.containerButton}>
                                        <Link to="/forgotpassword" className={classes.link}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                Forgot password?
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }

                        {
                            statusResponse === 404 && (
                                <div className={classes.containerContent}>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                        {messageFromServer}
                                    </Typography>
                                    <div className={classes.containerButton}>
                                        <Link to="/" className={classes.link}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                Go Home
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className={classes.containerButton}>
                                        <Link to="/forgotpassword" className={classes.link}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                Forgot password?
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }

                        {
                            statusResponse === 422 && (
                                <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                    {messageFromServer}
                                </Typography>
                            )
                        }

                        {
                            isLoading && (
                                <Typography component="h1" variant="subtitle1" className={classes.loading}>
                                    <CircularProgress />
                                </Typography>
                            )
                        }

                        {
                            statusResponse === 200 && statusResponse !== 403 && statusResponse !== 404 && statusResponse !== 422 && (
                                <div className={classes.containerContent}>
                                    <div>
                                        <Typography component="h1" variant="subtitle1" className={classes.typographySuccess}>
                                            {messageFromServer}
                                        </Typography>
                                    </div>
                                    <div className={classes.containerButton}>
                                        <Link to="/" className={classes.link}>
                                            <Button variant="contained" color="primary">
                                                Login
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                        
                        {
                            !updated && statusResponse !== 403 && statusResponse !== 404 && (
                                <div className={classes.containerContent}>
                                    <form className={classes.form} onSubmit={this.updatePassword}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            className={classes.textField}
                                            value={password}
                                            placeholder="Password"
                                            onChange={this.handleChange('password')}
                                            type="password"
                                            fullWidth
                                            margin="normal"
                                            autoComplete="off"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <div className={classes.containerButton}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                Update Password
                                            </Button>
                                        </div>
                                        <div className={classes.containerButton}>
                                            <Link to="/" className={classes.link}>
                                                <Button variant="contained" color="primary" className={classes.button}>
                                                    Go Home
                                                </Button>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </Paper>
                </Grid>
            </Fragment>
        );
    }
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    })
};

export default withStyles(styles, { withTheme: true })(ResetPassword);