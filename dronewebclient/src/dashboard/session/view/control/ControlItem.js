import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
    makeStyles,
    Typography,
    Box,
    Button,
    TextField,
    Avatar
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: 10
    }
}));

const INITIAL_CONTROL_VALUE = 0;

function ControlItem(props) {
    const classes = useStyles();

    const runningActions = useSelector(state => state.session.runningActions);

    const config = props.controlConfig;

    const dispatch = useDispatch();

    const [controlValue, setControlValue] = useState(INITIAL_CONTROL_VALUE);

    return (<div>
        <Box
            display="flex"
            alignItems="center"
            borderRadius={16}
            border={1}
            borderColor={runningActions.length ? 'action.disabled' : 'primary.light'}>
            <Box p={1}>
                <Avatar>{config.icon}</Avatar>
            </Box>
            <Box width="20%" flexGrow={1}>
                <Typography align='center|left' variant="subtitle1">{config.text}</Typography>
            </Box>
            <Box p={1} flexShrink={1} style={{ display: config.configurable ? 'block' : 'none' }}>
                <TextField
                    id="controlValue"
                    label="Number"
                    type="number"
                    variant="outlined"
                    disabled={runningActions.length}
                    onChange={e => setControlValue(e.target.value)}
                />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    inputProps={{ step: 0.01 }}
                    endIcon={<Send />}
                    onClick={() => config.onClick(controlValue) }
                    disabled={runningActions.length}
                >Execute</Button>
            </Box>
        </Box>
    </div>);

}

export default ControlItem;