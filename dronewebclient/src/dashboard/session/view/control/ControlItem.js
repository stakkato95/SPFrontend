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

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: 10
    },
}));

const defaultProps = {
    borderColor: 'primary.light',
    border: 1
};

function Control(props) {
    const classes = useStyles();

    // const { count, user } = useSelector(state => ({
    //     count: state.counter.count,
    //     user: state.user,
    // }), shallowEqual);

    const config = props.controlConfig;

    const dispatch = useDispatch();

    return (<div>
        <Box display="flex" alignItems="center" borderRadius={16} {...defaultProps}>
            <Box p={1}>
                <Avatar>{config.icon}</Avatar>
            </Box>
            <Box width="20%" flexGrow={1}>
                <Typography align='center|left' variant="subtitle1">{config.text}</Typography>
            </Box>
            <Box p={1} flexShrink={1} style={{ display: config.configurable ? 'block' : 'none' }}>
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    variant="outlined"
                />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    inputProps={{ step: 0.01 }}
                    endIcon={<Send />}
                    onClick={config.onClick}
                >Execute</Button>
            </Box>
        </Box>
    </div>);

}

export default Control;