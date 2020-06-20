import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles';
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

import { getUnregisteredDrones } from '../architecture/redux/DroneActions';

import PropTypes from 'prop-types';

import UnregisteredListItem from '../list/UnregisteredListItem';

const styles = theme => ({
  table: {
    marginTop: '8px'
  },
  container: {
    padding: '2px',
    position: 'relative'
  }
});

class UnregisteredDrones extends React.Component {

  componentDidMount() {
    this.props.getUnregisteredDrones();
  }

  render() {
    const { classes } = this.props;

    return (<Container className={classes.container} >
      <TableContainer
        component={Paper}
        className={classes.table}
        style={{ display: this.props.unregisteredDrones.length !== 0 ? 'block' : 'none' }}>
        <Table>
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
      <Typography
        variant='subtitle1' gutterBottom
        align='center'
        style={{
          display: this.props.unregisteredDrones.length !== 0 ? 'none' : 'block',
          marginTop: '16px'
        }}>
        No unregistered drones.
      </Typography>
    </Container>);
  }
}

UnregisteredDrones.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = { getUnregisteredDrones };
const mapStateToProps = state => {
  return {
    unregisteredDrones: state.drone.unregisteredDrones
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UnregisteredDrones));