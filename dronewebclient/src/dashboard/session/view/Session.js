import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Paper, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import DroneInfo from './info/DroneInfo';
import SessionInfo from './info/SessionInfo';
import SessionDuration from './info/SessionDuration';
import Control from './control/Control';

import { getSessionAndDroneAndRunningActions, listenSessionSse, listenActionSse } from '../architecture/redux/SessionActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    }
}));

const styles = theme => ({
    paper: {
        padding: '16px'
    }
});

function Session(props) {
    const session = useSelector(state => state.session.session);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessionAndDroneAndRunningActions());
        dispatch(listenSessionSse());
        dispatch(listenActionSse());
    });


    const classes = useStyles();

    return (<div>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <DroneInfo />
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <SessionInfo />
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <SessionDuration />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Control />
                </Paper>
            </Grid>
        </Grid>
    </div>);
}

export default Session;