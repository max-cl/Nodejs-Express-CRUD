import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

// Actions
import { removeTodo, updateTodo } from '../../redux/actions/todo.action';

// Styles
import { styles } from './styles';


class TodoDetail extends Component { 
    state = {
        toEdit: false,
        tableHeader: [
            { id_header: 1, header_txt: 'Id' },
            { id_header: 2, header_txt: 'Title' },
            { id_header: 3, header_txt: 'Done?' },
            { id_header: 4, header_txt: '' },
            { id_header: 5, header_txt: '' }
        ],
        title: '',
        done: false
    }

    componentDidMount(){
        const { match, todos } = this.props;
        const title = todos.filter(f => { return f.id === parseInt(match.params.id,10)}).map(p => { return p.title; })[0];
        const done = todos.filter(f => { return f.id === parseInt(match.params.id,10)}).map(p => { return p.done; })[0];
        this.setState({ title, done });
    }

    delTodo = (id) => {
        const { userInfo, removeTodo } = this.props;
        removeTodo(userInfo.id_user, id);
    }

    editTodo = () => {
        this.setState(prevState => ({
            toEdit: !prevState.toEdit
        }));
    }

    toUpdateTodo = (e) => {
        e.preventDefault();
        const { match, userInfo } = this.props;
        const { title, done } = this.state;
        this.props.updateTodo(userInfo.id_user, parseInt(match.params.id,10), title, done);
        this.setState(prevState => ({
            toEdit: !prevState.toEdit,
            title,
            done
        }));
    }

    handleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    handleChangeCheckBox = (e) => {
        this.setState({ done: e.target.checked });
    }

    render(){

        const { classes, match, todos } = this.props;
        const { tableHeader, toEdit, title, done } = this.state;
        const len = todos.filter(f => { return f.id === parseInt(match.params.id,10)}).length;
        
        if(len === 0){
            this.props.history.push('/home');
        }

        return (
            <Fragment>
                <div className={classes.backContainer}>
                    <Link to="/home" className={classes.link}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Back
                        </Button>
                    </Link>
                </div>
                {
                    toEdit ?
                        <Fragment>
                            <div className={classes.updateFormContainer}>
                                <form noValidate autoComplete="off" onSubmit={this.toUpdateTodo}>
                                    <TextField id="standard-basic" label="Product" className={classes.textField} value={title} onChange={this.handleChange}/>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={done}
                                                onChange={this.handleChangeCheckBox}
                                                name="done"
                                                color="primary"
                                            />
                                        }
                                        label="Is it Done?"
                                      />
                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.editTodo}>Cancel</Button>
                                    <Button variant="contained" color="primary" className={classes.button} type="submit">Update</Button>
                                </form>
                            </div>
                        </Fragment>
                    :
                        <div className={classes.tableContainer}>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHead}>
                                <TableRow>
                                {
                                    tableHeader.map(h => {
                                        return <TableCell  key={h.id_header} align="left">{h.header_txt}</TableCell>
                                    })
                                }
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    todos
                                    .filter(f => { return f.id === parseInt(match.params.id,10)})
                                    .map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{title}</TableCell>
                                            <TableCell align="left">{`${done ? 'It\'s Done' : 'It\'s not Done'}` }</TableCell>
                                            <TableCell  align="left">
                                                <IconButton aria-label="delete" onClick={() => this.delTodo(row.id)}>
                                                    <Delete fontSize="large" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell  align="left">
                                                <IconButton aria-label="edit" onClick={this.editTodo}>
                                                    <Edit fontSize="large" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>  
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </div>
                }
            </Fragment>
        );
    }
}

function mapStateToProps({ todo, auth }) {
    return {
        todos: todo.todos,
        userInfo: auth.user
    }
}

export default connect(mapStateToProps, { 
    removeTodo, updateTodo
})(withStyles(styles, { withTheme: true })(withRouter(TodoDetail)));