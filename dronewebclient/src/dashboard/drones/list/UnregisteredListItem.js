import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, TableCell, TableRow, Typography, IconButton } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import { UnregisteredDrone } from '../../../model/UnregisteredDrone';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function UnregisteredListItem(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">History</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default UnregisteredListItem;