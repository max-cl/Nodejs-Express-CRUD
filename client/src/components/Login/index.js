import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Add from '@material-ui/icons/Add';

// Actions
import { login } from '../../redux/actions/auth.action';
import { clearErrors } from '../../redux/actions/error.action';

// APIs
import { SIGNUP } from '../../redux/apis';

// Styles
import { styles } from './styles';

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: {},
        newFullName: '',
        newUserName: '',
        newPassword: '',
        newRepeatPassword: '',
        newEmail: '',
        newRoles: '',
        open: false,
        openDialog: false,
        addNewMsg: ''
    };

    componentDidMount(){
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            this.props.history.push('/home');
            this.props.clearErrors();
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { isAuthenticated, error } = this.props;

        if (prevProps.isAuthenticated !== isAuthenticated) {
            if(isAuthenticated){
                this.props.history.push('/home');
                this.props.clearErrors();
            }
        } else if(prevProps.error !== error){
            this.setState({ error: error });
        }
    }
    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const user = {
            username,
            password
        };
    
        // Attempt to login
        this.props.login(user);
    };
  

    errorMessages = (errorMessage, classes) => {
        if(errorMessage === 'No auth token'){
            return null;
        } else if(errorMessage === 'jwt expired'){
            return (
                <Typography component="h1" variant="subtitle1" className={classes.errorMsg}>
                    Session has expired
                </Typography>)
        } else {
            return (
                <Typography component="h1" variant="subtitle1" className={classes.errorMsg}>
                    {errorMessage}
                </Typography>);
        }
    }
    
    handleOpen = () => {
        this.setState(prevState => ({
            open: !prevState.open,
        }));
    }

    signUp = async (e) => {
        e.preventDefault();
        try {
            const { newFullName, newUserName, newPassword, newRepeatPassword, newEmail, newRoles } = this.state;
            const newUser = await axios.post(`${SIGNUP}`, {
                name: newFullName,
                username: newUserName,
                password: newPassword,
                repeat_password: newRepeatPassword,
                roles: newRoles,
                email: newEmail
            });

            this.setState(prevState => ({
                open: !prevState.open,
                openDialog: !prevState.openDialog,
                addNewMsg: newUser.data.message
            }));

        } catch (error) {
            console.log("SIGN-UP Error: ", error);
        }

    }

    handleCloseDialog = () => {
        this.setState(prevState => ({
            openDialog: !prevState.openDialog
        }));
    }

    render(){

        const { username, password, error, newFullName, newUserName, newPassword, newRepeatPassword, newEmail, newRoles, open,
                openDialog, addNewMsg } = this.state;
        const { classes } = this.props;

        return (
            <Grid className={classes.container}>  
                <Fragment>
                    <Dialog
                        open={openDialog}
                        onClose={this.handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{`${addNewMsg}!`}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Close and signIn with the new user.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                            OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Fragment>
                    <IconButton aria-label="edit" onClick={this.handleOpen}>
                        <Add fontSize="large" />
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={this.handleOpen}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal}
                    >
                        <div className={classes.addFormContainer}>
                            <form noValidate autoComplete="off" onSubmit={this.signUp}>
                                <TextField id="newFullName" variant="outlined" label="Full Name" className={classes.textField} value={newFullName} onChange={this.handleChange('newFullName')}/>
                                <TextField id="newUserName" variant="outlined" label="Username" className={classes.textField} value={newUserName} onChange={this.handleChange('newUserName')}/>
                                <TextField id="newPassword" type="password" variant="outlined" label="Password" className={classes.textField} value={newPassword} onChange={this.handleChange('newPassword')}/>
                                <TextField id="newRepeatPassword" type="password" variant="outlined" label="Repeat Password" className={classes.textField} value={newRepeatPassword} onChange={this.handleChange('newRepeatPassword')}/>
                                <TextField id="newEmail" variant="outlined" label="Email" className={classes.textField} value={newEmail} onChange={this.handleChange('newEmail')}/>
                                <TextField id="newRoles" variant="outlined" label="Role" className={classes.textField} value={newRoles} onChange={this.handleChange('newRoles')}/>
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen}>Cancel</Button>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">Add new User</Button>
                            </form>
                        </div>
                    </Modal>
                </Fragment>          
                <Paper className={classes.paperLogin}>
                    { 
                        this.errorMessages(error.msg, classes)
                    }
                    <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange('username')}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            value={password}
                            type="password"
                            autoComplete="off"
                            placeholder="Password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className={classes.containerButton}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Login
                            </Button>
                        </div>
                    </form>
                    <Fragment>
                        <Link to="/forgotpassword" className={classes.link}>
                            <Typography variant="h5" component="h5" className={classes.forgotPassword}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Fragment>
                </Paper>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth, error }) => ({
    isAuthenticated: auth.isAuthenticated,
    error: error
});

export default connect(mapStateToProps, { login, clearErrors })(withStyles(styles, { withTheme: true })(withRouter(Login)));