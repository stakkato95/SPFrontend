import React from 'react';

import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { connect } from 'react-redux';

import {
    setNewDroneName,
    setNewDroneNameAutoSessionStart,
    registerDrone,
    setRegisterDroneDialogVisible
} from '../../redux/DroneActions';

class RegisterDroneDialog extends React.Component {

    render() {
        return (
            <div>
                <Dialog open={this.props.isRegisterDroneDialogVisible}>
                    <DialogTitle id="form-dialog-title">Register a new drone</DialogTitle>
                    <DialogContent>
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
                            onChange={e => this.props.setNewDroneName(e.target.value)} />
                        <FormControlLabel
                            control={<Switch onChange={e => this.props.setNewDroneNameAutoSessionStart(e.target.checked)} />}
                            label="Automatically start session"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.setRegisterDroneDialogVisible(false)} color="primary">Cancel</Button>
                        <Button onClick={() => this.props.registerDrone()} color="primary">Register</Button>
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
        newDroneName: state.newDroneName,
        newDroneSessionAutoStart: state.newDroneSessionAutoStart,
        isDroneRegistrationInProgress: state.isDroneRegistrationInProgress,
        isRegisterDroneDialogVisible: state.isRegisterDroneDialogVisible
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDroneDialog);