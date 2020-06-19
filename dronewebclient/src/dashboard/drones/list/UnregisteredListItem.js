import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Typography, IconButton, Button } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp, Add } from '@material-ui/icons';

import { connect } from 'react-redux';

import { setRegisterDroneDialogVisible } from '../../../redux/DroneActions';

import RegisterDroneDialog from '../RegisterDroneDialog'

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    table: {
        maxWidth: 200
    }
}));

function UnregisteredListItem(props) {
    const { row } = props;
    const [expanded, setExpanded] = React.useState(false);

    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.ip}</TableCell>
                <TableCell align="right">{row.position.lat}</TableCell>
                <TableCell align="right">{row.position.lon}</TableCell>
                <TableCell align="right">{row.position.alt}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Additional information
                            </Typography>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Parameter</TableCell>
                                            <TableCell align="right">Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key="id">
                                            <TableCell component="th" scope="row">Id</TableCell>
                                            <TableCell align="right">{row.id}</TableCell>
                                        </TableRow>
                                        <TableRow key="ip">
                                            <TableCell component="th" scope="row">IP</TableCell>
                                            <TableCell align="right">{row.ip}</TableCell>
                                        </TableRow>
                                        <TableRow key="lat">
                                            <TableCell component="th" scope="row">Latitude</TableCell>
                                            <TableCell align="right">{row.position.lat}</TableCell>
                                        </TableRow>
                                        <TableRow key="lon">
                                            <TableCell component="th" scope="row">Longitude</TableCell>
                                            <TableCell align="right">{row.position.lon}</TableCell>
                                        </TableRow>
                                        <TableRow key="alt">
                                            <TableCell component="th" scope="row">Altitude</TableCell>
                                            <TableCell align="right">{row.position.alt}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            <Box display="flex" flexDirection="row-reverse">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button} 
                                    endIcon={<Add />}
                                    onClick={() => props.setRegisterDroneDialogVisible(true)}>Register</Button>
                                <RegisterDroneDialog />
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const mapDispatchToProps = { setRegisterDroneDialogVisible };

export default connect(null, mapDispatchToProps)(UnregisteredListItem);