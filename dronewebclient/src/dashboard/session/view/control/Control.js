import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { makeStyles, Typography, Grid } from '@material-ui/core';
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
    }
}));

function Control() {
    const classes = useStyles();

    const dispatch = useDispatch();

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
        <Grid container spacing={3}>
            {controlItems.map(item => {
                return (
                    <Grid item xs={6}>
                        <ControlItem controlConfig={item} />
                    </Grid>
                );
            })}
        </Grid>
    </div>);

}

export default Control;