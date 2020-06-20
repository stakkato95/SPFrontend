import React from 'react';

import { Grid, Paper, makeStyles } from '@material-ui/core';

import DroneInfo from './info/DroneInfo';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    }
}));

function Session() {
    const classes = useStyles();

    return (<div>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <DroneInfo/>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                </Paper>
            </Grid>
        </Grid>
    </div>);
}

export default Session;