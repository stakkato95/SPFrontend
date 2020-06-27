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

import { listenGnssSse, listenRotationSse, listenSpeedSse } from '../architecture/redux/TelemetryActions';


import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '16px'
    }
}));

function Telemetry(props) {
    const gnss = useSelector(state => state.telemetry.gnss);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenGnssSse());
    }, []);

    const classes = useStyles();

    const onRefresh = (chart) => {
        chart.data.datasets.forEach(function (dataset) {
            dataset.data.push({
                x: Date.now(),
                y: Math.random()
            });
        });
    };

    return (<div>
        <Line
            data={{ datasets: [{ data: [] }] }}
            options={{
                scales: {
                    xAxes: [{
                        type: 'realtime',
                        realtime: {
                            duration: 20000,
                            refresh: 1000,
                            delay: 2000,
                            pause: false,
                            ttl: undefined,
                            onRefresh: onRefresh
                        }
                    }]
                }
            }}
        />
        {gnss.length}
    </div>);
}

export default Telemetry;

const onRefresh = (chart) => {
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.push({
            x: Date.now(),
            y: Math.random()
        });
    });
};