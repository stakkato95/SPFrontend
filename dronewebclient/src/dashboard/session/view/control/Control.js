import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { makeStyles, Typography, Grid, CircularProgress, Container } from '@material-ui/core';
import {
    FlightTakeoff,
    FlightLand,
    ArrowUpward,
    ArrowDownward,
    ArrowBack,
    ArrowForward,
    RotateRight,
    RotateLeft
} from '@material-ui/icons';

import ControlItem from './ControlItem';
import { sendAction } from '../../architecture/redux/SessionActions';
import { ActionType } from '../../../../model/ActionType';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    },
    container: {
        padding: '0px',
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center'
    }
}));

function Control() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const runningActions = useSelector(state => state.session.runningActions);

    const controlItems = [
        {
            text: 'Take off safely',
            icon: <FlightTakeoff />,
            configurable: false,
            onClick: () => { dispatch(sendAction(ActionType.TAKE_OFF_SAFELY)) }
        },
        {
            text: 'Land safely',
            icon: <FlightLand />,
            configurable: false,
            onClick: () => { dispatch(sendAction(ActionType.LAND_SAFELY)) }
        },
        {
            text: 'Fly upward',
            icon: <ArrowUpward />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.FLY_UPWARD, value)) }
        },
        {
            text: 'Fly downward',
            icon: <ArrowDownward />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.FLY_DOWNWARD, value)) }
        },
        {
            text: 'Fly to left',
            icon: <ArrowBack />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.FLY_TO_LEFT, value)) }
        },
        {
            text: 'Fly to right',
            icon: <ArrowForward />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.FLY_TO_RIGHT, value)) }
        },
        {
            text: 'Rotate left',
            icon: <RotateLeft />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.ROTATE_LEFT, value)) }
        },
        {
            text: 'Rotate right',
            icon: <RotateRight />,
            configurable: true,
            onClick: (value) => { dispatch(sendAction(ActionType.ROTATE_RIGHT, value)) }
        }
    ];

    // const { count, user } = useSelector(state => ({
    //     count: state.counter.count,
    //     user: state.user,
    // }), shallowEqual);

    return (<div>
        <Typography variant="h4" gutterBottom>Send actions</Typography>
        <Container className={classes.container}>
            <CircularProgress
                className={classes.progress}
                style={{ display: runningActions.length ? 'block' : 'none' }}
                size={60}
            />
            <Grid container spacing={3} className={classes.container}>
                {controlItems.map(item => {
                    return (
                        <Grid item xs={6}>
                            <ControlItem controlConfig={item} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    </div>);

}

export default Control;