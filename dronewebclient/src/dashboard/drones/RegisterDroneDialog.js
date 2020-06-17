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
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };
        //TODO move drones saga to drones package
        //TODO add dialog state to drone saga and reducer

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="name" label="Email Address" type="text" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleClose} color="primary">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default RegisterDroneDialog;