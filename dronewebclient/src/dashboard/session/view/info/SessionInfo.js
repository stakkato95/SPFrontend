import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Box
} from '@material-ui/core';
import { Memory, QueryBuilder, Timeline, Flight } from '@material-ui/icons';

import { stopSession } from '../../architecture/redux/SessionActions';

function SessionInfo(props) {
    const session = useSelector(state => state.session.session);
    const dispatch = useDispatch();

    return (<>
        <Typography variant="h4" gutterBottom>Session info</Typography>
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Memory />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={session.id} secondary="Id" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <QueryBuilder />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={session.sessionStartTime} secondary="Start time" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Timeline />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={session.sessionState} secondary="Session state" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Flight />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={session.flightState} secondary="Flight state" />
            </ListItem>
        </List>
        <Box display="flex" flexDirection="row-reverse">
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                    dispatch(stopSession(session.id));
                    console.log('clicked');
                }}
            >Stop session</Button>
        </Box>
    </>);
}

export default SessionInfo;