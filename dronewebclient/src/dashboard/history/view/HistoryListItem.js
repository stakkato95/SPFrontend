import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Typography, IconButton, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp, Add } from '@material-ui/icons';

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
        maxWidth: 400
    },
    alert: {
        marginBottom: '16px'
    }
}));

function HistoryListItem(props) {
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
                <TableCell component="th" scope="row">{row.session.id}</TableCell>
                <TableCell align="right">{row.drone.id}</TableCell>
                <TableCell align="right">{row.drone.name}</TableCell>
                <TableCell align="right">{row.session.sessionStartTime}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                                    <TableCell component="th" scope="row">Session state</TableCell>
                                    <TableCell align="right">{row.session.sessionState}</TableCell>
                                </TableRow>
                                <TableRow key="ip">
                                    <TableCell component="th" scope="row">Start time</TableCell>
                                    <TableCell align="right">{row.session.sessionStartTime}</TableCell>
                                </TableRow>
                                {row.session.sessionEndTime &&
                                    <TableRow key="lat">
                                        <TableCell component="th" scope="row">End time</TableCell>
                                        <TableCell align="right">{row.session.sessionEndTime}</TableCell>
                                    </TableRow>
                                }
                                <TableRow key="lon">
                                    <TableCell component="th" scope="row">Flight state</TableCell>
                                    <TableCell align="right">{row.session.flightState}</TableCell>
                                </TableRow>
                                <TableRow key="alt">
                                    <TableCell component="th" scope="row">Finishd actions</TableCell>
                                    <TableCell align="right">{row.actions}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default HistoryListItem;