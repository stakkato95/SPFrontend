import React from 'react';
import { useStore } from 'react-redux';

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const Telemetry = React.memo(function (props) {
    const store = useStore();

    const { color } = props;
    const { getData } = props;
    const { getTimestamp } = props;

    const data = {
        labels: [],
        datasets: [
            {
                fill: false,
                lineTension: 0.1,
                borderColor: color,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: color,
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                data: []
            }
        ]
    };

    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    pause: false,
                    ttl: undefined,
                    onRefresh: function (chart) {
                        const telemetry = store.getState().telemetry;
                        chart.data.datasets[0].data.push({

                            x: new Date(getTimestamp(telemetry)),
                            y: getData(telemetry)

                        });
                    }
                },
                ticks: {
                    maxTicksLimit: 20,
                    maxRotation: 0
                }
            }]
        },
        plugins: {
            streaming: {
                frameRate: 30
            }
        }
    };

    return (<div>
        <Line data={data} options={options} height={80} />
    </div>);
});

export default Telemetry;