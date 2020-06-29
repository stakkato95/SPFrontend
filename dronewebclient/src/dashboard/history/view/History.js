import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Typography
} from '@material-ui/core';

import { getHistory } from '../architecture/redux/HistoryActions';

// import PropTypes from 'prop-types';

import HistoryListItem from './HistoryListItem';

const useStyles = makeStyles({
    table: {
        marginTop: '8px'
    },
    container: {
        padding: '2px',
        position: 'relative'
    }
});

function History() {
    const history = useSelector(state => state.history.history);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistory());
    });

    if (history.length === 0) {
        return (<Typography
            gutterBottom
            variant='subtitle1'
            align='center'
            style={{ marginTop: '16px' }}>
            No sessions in history.
        </Typography>);
    }

    return (<Container className={classes.container} >
        <TableContainer
            component={Paper}
            className={classes.table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Drone Id</TableCell>
                        <TableCell align="right">Drone name</TableCell>
                        <TableCell align="right">Start time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {history.map(item => {
                        return (<p>{item.session.id}</p>)
                    })} */}

                    {history.map((row) => (
                        <HistoryListItem key={row.session.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>);
}

export default History;