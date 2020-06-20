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

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    }
}));

function Control() {
    const classes = useStyles();

    const controlItems = [
        {
            text: 'Take off safely',
            icon: <FlightTakeoff />,
            configurable: false
        },
        {
            text: 'Land safely',
            icon: <FlightLand />,
            configurable: false
        },
        {
            text: 'Fly upward',
            icon: <ArrowUpward />,
            configurable: true
        },
        {
            text: 'Fly downward',
            icon: <ArrowDownward />,
            configurable: true
        },
        {
            text: 'Fly to left',
            icon: <ArrowBack />,
            configurable: true
        },
        {
            text: 'Fly to right',
            icon: <ArrowForward />,
            configurable: true
        },
        {
            text: 'Rotate left',
            icon: <RotateLeft />,
            configurable: true
        },
        {
            text: 'Rotate right',
            icon: <RotateRight />,
            configurable: true
        }
    ];

    // const { count, user } = useSelector(state => ({
    //     count: state.counter.count,
    //     user: state.user,
    // }), shallowEqual);

    const dispatch = useDispatch();

    return (<div>
        <Typography variant="h4" gutterBottom>Send actions</Typography>
        <Grid container spacing={3}>
            {controlItems.map(item => {
                return (
                    <Grid item xs={6}>
                        <ControlItem
                            text={item.text}
                            icon={item.icon}
                            configurable={item.configurable} />
                    </Grid>
                );
            })}
        </Grid>
    </div>);

}

export default Control;