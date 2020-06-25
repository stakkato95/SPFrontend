import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Grid,
    Paper,
    Typography,
    IconButton,
    Collapse,
    makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

import DroneInfo from './info/DroneInfo';
import SessionInfo from './info/SessionInfo';
import SessionDuration from './info/SessionDuration';
import Control from './control/Control';

import {
    getSessionAndDroneAndRunningActions,
    listenSessionSse,
    listenActionSse,
    clearInterruptedSession
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
    }, []);


    const classes = useStyles();

    const { history } = props;
    console.log(history);

    if (session === null) {
        return (<div>
            <Typography className={classes.emptyText} variant='subtitle1' gutterBottom align='center'>
                No running sessions.
            </Typography>
        </div>);
    }

    return (<div>
        {!isSessionRunning() &&
            <Collapse in={!isSessionRunning()} style={{ padding: '16px' }}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(clearInterruptedSession());
                                history.push('/drones/registered');
                            }}>
                            <Close fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>Session was interrupted</AlertTitle>
                    You can go to the list of <strong>all registered drones</strong> and check state of your drone!
                </Alert>
            </Collapse>
        }




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

    </div>);
}

export default Session;