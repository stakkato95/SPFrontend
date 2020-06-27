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

    return (<div>
        {gnss.length}
    </div>);
}

export default Telemetry;