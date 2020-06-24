import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import DroneInfo from './info/DroneInfo';
import SessionInfo from './info/SessionInfo';
import SessionDuration from './info/SessionDuration';
import Control from './control/Control';

import { 
    getSessionAndDroneAndRunningActions, 
    listenSessionSse
} from '../architecture/redux/SessionActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    },
    disabledContainer: {
        // pointerEvents: 'none',
        // opacity: 0.3
    }
}));

function Session(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const session = useSelector(state => state.session.session);

    useEffect(() => {
        dispatch(getSessionAndDroneAndRunningActions());
        // dispatch(listenSessionSse());
    });

    return (<div>
        <Grid container spacing={3} className={classes.disabledContainer}>
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
        {/* <Typography
            variant='subtitle1' gutterBottom
            align='center'
            style={{
                display: session ? 'none' : 'block',
                marginTop: '16px'
            }}>
            No registered drones.
        </Typography> */}
    </div>);
}

export default Session;