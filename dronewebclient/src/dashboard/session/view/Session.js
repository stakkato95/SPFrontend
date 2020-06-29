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
import Telemetry from '../telemetry/view/Telemetry';
import MapContainer from './map/MapContainer';


import {
    getSessionInitialState,
    listenSessionSse,
    listenActionSse,
    clearSession,
    listenDroneSse
} from '../architecture/redux/SessionActions';
import { listenAllTelemetrySse } from '../telemetry/architecture/redux/TelemetryActions';
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
    },
    telemetryTitle: {
        marginLeft: '32px',
        marginTop: '32px'
    },
    telemetryChart: {
        paddingBottom: '32px'
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

        setTimeout(() => {
            //TODO receive all actions from a single source
            //too many simultaneous connections from this app
            dispatch(listenSessionSse());
            dispatch(listenActionSse());
            // dispatch(listenDroneSse());
            dispatch(listenAllTelemetrySse());
        }, 1000);
    }, []);

    const onAlertClick = () => {
        dispatch(clearSession());
        history.push('/drones/registered');
    };

    const classes = useStyles();

    const { history } = props;

    const telemetrySections = [
        {
            sectionTitle: 'Speed',
            items: [
                {
                    subsectionTitle: 'X-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.speed.x,
                    getTimestamp: telemetry => telemetry.speed.timestamp
                },
                {
                    subsectionTitle: 'Y-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.speed.y,
                    getTimestamp: telemetry => telemetry.speed.timestamp
                },
                {
                    subsectionTitle: 'Z-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.speed.z,
                    getTimestamp: telemetry => telemetry.speed.timestamp
                }
            ]
        },
        {
            sectionTitle: 'Rotation',
            items: [
                {
                    subsectionTitle: 'X-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.rotation.x,
                    getTimestamp: telemetry => telemetry.rotation.timestamp
                },
                {
                    subsectionTitle: 'Y-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.rotation.y,
                    getTimestamp: telemetry => telemetry.rotation.timestamp
                },
                {
                    subsectionTitle: 'Z-axis',
                    color: '#4cc0c0',
                    getData: telemetry => telemetry.rotation.z,
                    getTimestamp: telemetry => telemetry.rotation.timestamp
                }
            ]
        }
    ];

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
            <Typography variant="h4" gutterBottom className={classes.telemetryTitle}>Telemetry info</Typography>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant='h5' gutterBottom>Position</Typography>
                    <Typography variant='subtitle1' gutterBottom align='center'>Altitude</Typography>
                    <Telemetry
                        color={'#4cc0c0'}
                        getData={telemetry => telemetry.gnss.alt}
                        getTimestamp={telemetry => telemetry.gnss.timestamp} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <MapContainer />
                </Paper>
            </Grid>
            {telemetrySections.map(section => {
                return (
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h5' gutterBottom>{section.sectionTitle}</Typography>

                            {section.items.map(subsection => {
                                return (
                                    <div className={classes.telemetryChart}>
                                        <Typography variant='subtitle1' gutterBottom align='center'>
                                            {subsection.subsectionTitle}
                                        </Typography>
                                        <Telemetry
                                            color={subsection.color}
                                            getData={subsection.getData}
                                            getTimestamp={subsection.getTimestamp} />
                                    </div>
                                );
                            })}

                        </Paper>
                    </Grid>
                );
            })}
        </Grid>

    </div>);
}

export default Session;