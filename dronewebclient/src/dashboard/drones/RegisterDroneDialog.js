import React from 'react';
import { connect } from 'react-redux';

import { Button, TextField, Switch, FormControlLabel, CircularProgress, Container } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import {
    setNewDroneName,
    setNewDroneNameAutoSessionStart,
    registerDrone,
    setRegisterDroneDialogVisible
} from './architecture/redux/DroneActions';

const styles = theme => ({
    container: {
        padding: '0px',
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center'
    }
});

class RegisterDroneDialog extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Dialog open={this.props.isRegisterDroneDialogVisible}>
                    <DialogTitle id="form-dialog-title">Register a new drone</DialogTitle>
                    <DialogContent>
                        <Container className={classes.container}>
                            <CircularProgress
                                className={classes.progress}
                                style={{ display: this.props.isDroneRegistrationInProgress ? 'block' : 'none' }}
                            />
                            <Container className={classes.container}>
                                <DialogContentText>
                                    To create a new drone, please enter its name. You can also automatically start a session with this drone.
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    id="name"
                                    label="Drone name"
                                    type="text"
                                    value={this.props.newDroneName}
                                    onChange={e => this.props.setNewDroneName(e.target.value)}
                                    disabled={this.props.isDroneRegistrationInProgress} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={e => this.props.setNewDroneNameAutoSessionStart(e.target.checked)}
                                            disabled={this.props.isDroneRegistrationInProgress} />
                                    }
                                    label="Automatically start session"
                                />
                            </Container>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={() => this.props.setRegisterDroneDialogVisible(false)}
                            disabled={this.props.isDroneRegistrationInProgress}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            onClick={() => this.props.registerDrone()}
                            disabled={this.props.isDroneRegistrationInProgress}
                        >Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setNewDroneName,
    setNewDroneNameAutoSessionStart,
    registerDrone,
    setRegisterDroneDialogVisible
};
const mapStateToProps = state => {
    return {
        newDroneName: state.drone.newDroneName,
        newDroneSessionAutoStart: state.drone.newDroneSessionAutoStart,
        isDroneRegistrationInProgress: state.drone.isDroneRegistrationInProgress,
        isRegisterDroneDialogVisible: state.drone.isRegisterDroneDialogVisible,
        isDroneRegistrationInProgress: state.drone.isDroneRegistrationInProgress
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegisterDroneDialog));