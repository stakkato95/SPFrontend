import React from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { Memory, SettingsEthernet, AccountCircle } from '@material-ui/icons';

import { getDrone } from '../../architecture/redux/SessionActions';

class DroneInfo extends React.Component {

    componentDidMount() {
        this.props.getDrone();
    }

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
            </List>
        </>);
    }
}

const mapDispatchToProps = { getDrone };
const mapStateToProps = state => {
    return {
        drone: state.session.drone
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DroneInfo);