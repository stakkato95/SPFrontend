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
import SessionAlert from './SessionAlert';

import {
    getSessionInitialState,
    listenSessionSse,
    listenActionSse,
    clearSession
} from '../architecture/redux/SessionActions';
import { SessionState } from '../../../model/SessionState';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    },
    emptyText: {
        marginTop: '16px'
    },
    alert: {
        padding: '16px'
    }
}));

function Session(props) {
    const session = useSelector(state => state.session.session);
    const isSessionRunning = () => session.sessionState === SessionState.RUNNING;
    const isSessionInterrupted = () => session.sessionState === SessionState.INTERRUPTED;
    const isSessionFinished = () => session.sessionState === SessionState.FINISHED;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessionInitialState());
        dispatch(listenSessionSse());
        dispatch(listenActionSse());
    }, []);

    const onAlertClick = () => {
        dispatch(clearSession());
        history.push('/drones/registered');
    };

    const classes = useStyles();

    const { history } = props;

    if (session === null) {
        return (<div>
            <Typography className={classes.emptyText} variant='subtitle1' gutterBottom align='center'>
                No running sessions.
            </Typography>
        </div>);
    }

    return (<div>
        {isSessionInterrupted() &&
            <SessionAlert
                severity={'error'}
                onAlertClick={onAlertClick}
                title={'Session was interrupted'}
                text={<span>You can go to the list of <strong>all registered drones</strong> and check state of your drone!</span>} />
        }
        {isSessionFinished() &&
            <SessionAlert
            severity={'success'}
            onAlertClick={onAlertClick}
            title={'Session was succesfully finished'}
            text={<span>You can check information about this session in the <strong>History</strong>!</span>} />
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