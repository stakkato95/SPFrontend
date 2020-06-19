import React from 'react';

import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { connect } from 'react-redux';

import { setNewDroneName, setNewDroneNameAutoSessionStart, registerDrone } from '../../redux/DroneActions';

class RegisterDroneDialog extends React.Component {

    render() {
        const handleCancel = () => {
            this.props.setDialogOpen(false)
        };

        const handleRegister = () => {
            this.props.setDialogOpen(false)
        };

        return (
            <div>
                <Dialog open={this.props.dialogOpen}>
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
                        <Button onClick={handleCancel} color="primary">Cancel</Button>
                        <Button onClick={handleRegister} color="primary">Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProps = { setNewDroneName, setNewDroneNameAutoSessionStart, registerDrone };
const mapStateToProps = state => {
    return {
        newDroneName: state.newDroneName,
        newDroneSessionAutoStart: state.newDroneSessionAutoStart,
        isDroneRegistrationInProgress: state.isDroneRegistrationInProgress
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDroneDialog);