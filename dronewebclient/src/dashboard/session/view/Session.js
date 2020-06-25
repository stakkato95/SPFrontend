import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import DroneInfo from './info/DroneInfo';
import SessionInfo from './info/SessionInfo';
import SessionDuration from './info/SessionDuration';
import Control from './control/Control';

import {
    getSessionAndDroneAndRunningActions,
    listenSessionSse,
    listenActionSse
} from '../architecture/redux/SessionActions';
import { SessionState } from '../../../model/SessionState';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    },
    emptyText: {
        marginTop: '16px'
    }
}));

function Session(props) {
    const session = useSelector(state => state.session.session);
    const isSessionRunning = () => session.sessionState === SessionState.RUNNING;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessionAndDroneAndRunningActions());
        dispatch(listenSessionSse());
        dispatch(listenActionSse());
    });


    const classes = useStyles();

    return (<div>
        {session === null &&
            <Typography className={classes.emptyText} variant='subtitle1' gutterBottom align='center'>
                No running sessions.
            </Typography>
        }
        {session !== null &&
            <Grid container spacing={3} style={{
                pointerEvents: isSessionRunning() ? 'auto' : 'none',
                opacity: isSessionRunning() ? 1 : 0.3
            }}>
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
        }
    </div>);
}

export default Session;