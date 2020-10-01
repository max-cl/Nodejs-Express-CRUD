import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Constants
import { FORGOT_PASSWORD } from '../../redux/apis';

// Styles
import { styles } from './styles';

const title = {
    pageTitle: 'Forgot Password',
};


class ForgotPassword extends Component {
    state = {
        email: '',
        messageFromServer: '',
        statusResponse: null
    };

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sendEmail = async (e) => {
        e.preventDefault();
        const { email } = this.state;
        try {
            const response = await axios.post(`${FORGOT_PASSWORD}`,{ email });
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    statusResponse: response.status,
                    messageFromServer: response.data
                });
            }
        } catch (error) {
            console.error(error.response.data);
            if (error.response.status === 403) {
                this.setState({
                    statusResponse: error.response.status,
                    messageFromServer: error.response.data
                });
            } else if (error.response.status === 400) {
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

        const { email, messageFromServer, statusResponse } = this.state;
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
                            statusResponse === 200 && (
                                <div>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographySuccess}>
                                        {messageFromServer}
                                    </Typography>
                                </div>
                            )
                        }

                        {
                            statusResponse === 400 && (
                                <div>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                        {messageFromServer}
                                    </Typography>
                                </div>
                            )
                        }

                        {
                            statusResponse === 403 && (
                                <div>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                        {messageFromServer}
                                    </Typography>
                                </div>
                            )
                        }

                        {
                            statusResponse === 422 && (
                                <div>
                                    <Typography component="h1" variant="subtitle1" className={classes.typographyError}>
                                        {messageFromServer}
                                    </Typography>
                                </div>
                            )
                        }

                        <div className={classes.containerContent}>
                            <form onSubmit={this.sendEmail} className={classes.form}>
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                placeholder="Email Address"
                                onChange={this.handleChange('email')}
                                fullWidth
                                margin="normal"
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
                                        Send Password Reset Email
                                    </Button>
                                    <Link to="/" className={classes.link}>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            Go Home
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </Grid>
            </Fragment>
        );
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ForgotPassword);