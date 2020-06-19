import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Typography, IconButton, Button, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp, Add } from '@material-ui/icons';

import { connect } from 'react-redux';

import {
    setRegisterDroneDialogVisible,
    setSelectedUnregisteredDroneId
} from '../../../redux/DroneActions';

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
        // maxWidth: 400
    }
}));

function RegisteredListItem(props) {
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
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.lastConnectionTime}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box margin={1} display='flex'>
                            {/* <Typography variant="h6" gutterBottom component="div">
                                Additional information
                            </Typography> */}
                            <img src="https://image.flaticon.com/icons/svg/215/215767.svg" width='250px' height='250px'/>
                            <Table className={classes.table} size="small">
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
                                        <TableCell component="th" scope="row">Show up time</TableCell>
                                        <TableCell align="right">{row.showUpTime}</TableCell>
                                    </TableRow>
                                    <TableRow key="lon">
                                        <TableCell component="th" scope="row">Registration time</TableCell>
                                        <TableCell align="right">{row.registrationTime}</TableCell>
                                    </TableRow>
                                    <TableRow key="alt">
                                        <TableCell component="th" scope="row">Last connection time</TableCell>
                                        <TableCell align="right">{row.lastConnectionTime}</TableCell>
                                    </TableRow>
                                    <TableRow key="alt">
                                        <TableCell component="th" scope="row">Last seen time</TableCell>
                                        <TableCell align="right">{row.lastSeenTime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const mapDispatchToProps = { setRegisterDroneDialogVisible, setSelectedUnregisteredDroneId };

export default connect(null, mapDispatchToProps)(RegisteredListItem);