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

import { getRegisteredDrones } from '../../redux/DroneActions';

import PropTypes from 'prop-types';

import RegisteredListItem from './list/RegisteredListItem';

const styles = theme => ({
  table: {
    marginTop: '8px'
  },
  container: {
    padding: '2px',
    position: 'relative'
  }
});

class RegisteredDrones extends React.Component {

  componentDidMount() {
    this.props.getRegisteredDrones();
  }

  render() {
    const { classes } = this.props;

    return (<Container className={classes.container} >
      <TableContainer
        component={Paper}
        className={classes.table}
        style={{ display: this.props.registeredDrones.length !== 0 ? 'block' : 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Last connection time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.registeredDrones.map((row) => (
              <RegisteredListItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='subtitle1' gutterBottom
        align='center'
        style={{
          display: this.props.registeredDrones.length !== 0 ? 'none' : 'block',
          marginTop: '16px'
        }}>
        No registered drones.
      </Typography>
    </Container>);
  }
}

RegisteredDrones.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = { getRegisteredDrones };
const mapStateToProps = state => {
  return {
    registeredDrones: state.registeredDrones
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegisteredDrones));