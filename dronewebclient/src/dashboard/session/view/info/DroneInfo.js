import React from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { Memory, SettingsEthernet, AccountCircle, Timelapse } from '@material-ui/icons';

class DroneInfo extends React.Component {

    render() {
        return (<>
            <Typography variant="h4" gutterBottom>Drone info</Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Memory />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.drone.id} secondary="Id" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <SettingsEthernet />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.drone.ip} secondary="IP" />
                </ListItem> 
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.drone.name} secondary="Name" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Timelapse />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.drone.lastSeenTime} secondary="Last ping" />
                </ListItem>
            </List>
        </>);
    }
}

const mapStateToProps = state => {
    return {
        drone: state.session.drone
    };
};

export default connect(mapStateToProps, null)(DroneInfo);