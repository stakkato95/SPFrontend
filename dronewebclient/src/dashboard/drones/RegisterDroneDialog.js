import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="name" label="Email Address" type="text" fullWidth />
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