import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from './styles';


const NotFound = (props) => {  

    const { classes } = props;

    return (
        <Fragment>
            <div>
                <Link to="/home">Back</Link>
            </div>
            <div className={classes.notFoundMsg}>
                <h1>Page Not Found</h1>
            </div>
        </Fragment>
    );
}

export default withStyles(styles)(withRouter(NotFound));