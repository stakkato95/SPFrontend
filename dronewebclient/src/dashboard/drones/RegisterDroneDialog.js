import React from 'react';

import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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
                        <TextField autoFocus margin="dense" id="name" label="Drone name" type="text" fullWidth />
                        <FormControlLabel
                            control={<Switch />}
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

export default RegisterDroneDialog;