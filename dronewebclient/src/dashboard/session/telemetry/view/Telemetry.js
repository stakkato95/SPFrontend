import React, { useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';

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







const Telemetry = React.memo(function (props) {
    const store = useStore();
    console.log(store.getState());

    // const gnss = useSelector(state => state.telemetry.gnss);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(listenGnssSse());
    // });

    const classes = useStyles();








    const data = {
        labels: [],// gnss.map(i => i.timestamp),// ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
                data: []// gnss.map(i => {
                //return i.alt;
                //})//[65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };


    const options = {
        scales: {
            xAxes: [{
                type: 'realtime',   // x axis will auto-scroll from right to left
                realtime: {         // per-axis options
                    duration: 20000,    // data in the past 20000 ms will be displayed
                    refresh: 1000,      // onRefresh callback will be called every 1000 ms
                    delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
                    pause: false,       // chart is not paused
                    ttl: undefined,     // data will be automatically deleted as it disappears off the chart

                    // a callback to update datasets
                    onRefresh: function (chart) {
                        // console.log(gnss.alt);
                        chart.data.datasets[0].data.push({

                            x: Date.now(),

                            y: store.getState().telemetry.gnss.alt//Math.random()// 

                        });
                    }
                }
            }]
        },
        plugins: {
            streaming: {            // per-chart option
                frameRate: 30       // chart is drawn 30 times every second
            }
        }
    };















    return (<div>
        <Line data={data} options={options} />
    </div>);
});

export default Telemetry;