import React from 'react';
import { connect } from 'react-redux';

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

class SessionInfo extends React.Component {

    render() {
        return (<>
            <Typography variant="h4" gutterBottom>Session info</Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Memory />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.session.id} secondary="Id" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <QueryBuilder />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.session.sessionStartTime} secondary="Start time" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Timeline />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.session.sessionState} secondary="Session state" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Flight />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.session.flightState} secondary="Flight state" />
                </ListItem>
            </List>
            <Box display="flex" flexDirection="row-reverse">
                <Button variant="outlined" color="secondary">Stop session</Button>
            </Box>
        </>);
    }
}

const mapStateToProps = state => {
    return {
        session: state.session.session
    };
};

export default connect(mapStateToProps, null)(SessionInfo);