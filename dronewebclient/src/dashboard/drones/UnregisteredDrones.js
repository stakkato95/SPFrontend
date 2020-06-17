import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

    // return (<div>
    //   {this.props.unregisteredDrones.map(d => {
    //     console.log(d.id);
    //     return (<p>{d.id}</p>)
    //   })}
    // </div>);
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