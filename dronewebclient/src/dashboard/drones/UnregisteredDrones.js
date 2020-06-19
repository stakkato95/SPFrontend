import React from 'react';
import { withStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getUnregisteredDrones } from '../../redux/DroneActions';

import UnregisteredListItem from './list/UnregisteredListItem';

const styles = theme => ({
  table: {
    marginTop: '8px'
  },
  container: {
    padding: '0px',
    position: 'relative'
  }
});

class UnregisteredDrones extends React.Component {

  componentDidMount() {
    this.props.getUnregisteredDrones();
    console.log('componentDidMount called');
  }

  render() {
    const { classes } = this.props;

    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE
    //TODO EMPTY STATE

    return (<Container className={classes.container} >
      <TableContainer 
      component={Paper} 
      className={classes.table}
      style={{ display: this.props.unregisteredDrones.length !== 0 ? 'block' : 'none' }}>
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
      </TableContainer>
    </Container>);
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