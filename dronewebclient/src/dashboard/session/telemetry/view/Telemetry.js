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










    const data = {
        labels: gnss.map(i => i.timestamp),// ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: gnss.map(i => {
                    return i.alt;
                })//[65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };


    const options = {
        animation: {
            duration: 0
        }
    };















    return (<div>
        <Line data={data} options={options} />
        {gnss.length}
    </div>);
}

export default Telemetry;