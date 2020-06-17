import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { getUnregisteredDrones } from '../../redux/DroneActions'

import UnregisteredListItem from './list/UnregisteredListItem';

// const tableStyles = makeStyles({
//   table: {
//       marginTop: '16px'
//   },
// });

const styles = theme => ({
  table: {
      marginTop: '8px'
  },
});

class UnregisteredDrones extends React.Component {

  componentDidMount() {
    this.props.getUnregisteredDrones();
    console.log('componentDidMount called');
  }

  render() {
    //const classes = tableStyles();
    const { classes } = this.props;

    return (<TableContainer component={Paper} className={classes.table}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">IP</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Altitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.unregisteredDrones.map((row) => (
            <UnregisteredListItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
  }
}

UnregisteredDrones.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = { getUnregisteredDrones };
const mapStateToProps = state => {
  return {
    unregisteredDrones: state.unregisteredDrones
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UnregisteredDrones));