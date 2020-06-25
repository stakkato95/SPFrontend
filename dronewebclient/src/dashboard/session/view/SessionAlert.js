import React from 'react';

import { IconButton, Collapse } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

function SessionAlert(props) {
    return (<Collapse in={true} style={{ padding: '16px' }}>
        <Alert
            severity={props.severity}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={props.onAlertClick}>
                    <Close fontSize="inherit" />
                </IconButton>
            }>
            <AlertTitle>{props.title}</AlertTitle>
            {props.text}
        </Alert>
    </Collapse>);
}

export default SessionAlert;