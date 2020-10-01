import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

// Components
import Todos from '../Todos';

// Action
import { logout } from '../../redux/actions/auth.action';
import { getTodos, createTodo } from '../../redux/actions/todo.action';

// Styles
import { styles } from './styles';


class Home extends Component {
    state = {
        tableHeader: [
            { id_header: 1, header_txt: 'Id' },
            { id_header: 2, header_txt: 'Title' },
            { id_header: 3, header_txt: 'Done?' }
        ],
        open: false,
        title: ''
    };

    componentDidMount(){
        const { userInfo, isAuthenticated, getTodos } = this.props;
    
        if(isAuthenticated){
            getTodos(userInfo.id_user);
        }
    }

    logoutApp = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    handleOpen = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            open: !prevState.open,
        }));
    }

    handleChange = (e) => {
        const title = e.target.value;
        this.setState({ title });
    }

    toCreateTodo = (e) => {
        e.preventDefault();
        const { userInfo } = this.props;
        const { title } = this.state;
        this.props.createTodo(userInfo.id_user, title);
        this.setState(prevState => ({
            open: !prevState.open,
            title: ''
        }));
    }

    render(){
        const { classes, isAuthenticated, todos } = this.props;
        const { tableHeader, open, title } = this.state;

        if(!isAuthenticated){
            this.props.history.push('/');
        }

        return (
            <div className={classes.homeContainer}>
            {
                isAuthenticated && 
                    <div className={classes.logoutContainer}>
                        <Button variant="contained" color="primary" onClick={this.logoutApp} className={classes.button}>
                            Logout
                        </Button>
                    </div>
            }
                
                <div className={classes.tableContainer}>
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
                                <form noValidate autoComplete="off" onSubmit={this.toCreateTodo}>
                                    <TextField id="standard-basic" label="Title" className={classes.textField} value={title} onChange={this.handleChange}/>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen}>Cancel</Button>
                                    <Button variant="contained" color="primary" className={classes.button} type="submit">Create</Button>
                                </form>
                            </div>
                        </Modal>
                    </Fragment>
                    <Todos 
                        todos={todos}
                        header={tableHeader}
                    />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    getTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired
};

function mapStateToProps({ auth, error, todo }) {
    return {
        isAuthenticated: auth.isAuthenticated,
        errorInfo: error,
        userInfo: auth.user,
        todos: todo.todos
    }
}

export default connect(mapStateToProps, { 
    logout, getTodos, createTodo
})(withStyles(styles, { withTheme: true })(withRouter(Home)));