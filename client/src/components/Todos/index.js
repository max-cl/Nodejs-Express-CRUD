import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Styles
import { styles } from './styles';


const Todos = (props) => {  

    const { classes, todos, header } = props;

    return (
        <Fragment>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                <TableRow>
                {
                    header.map(h => {
                        return <TableCell  key={h.id_header} align="left">{h.header_txt}</TableCell>
                    })
                }
                </TableRow>
                </TableHead>
                <TableBody>
                {todos.map(row => (
                    <TableRow key={row.id} component={Link} to={`/tododetail/${row.id}`} className={classes.link}>        
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{`${row.done ? 'It\'s Done' : 'It\'s not Done'}` }</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Fragment>
    );
}

export default withStyles(styles)(withRouter(Todos));