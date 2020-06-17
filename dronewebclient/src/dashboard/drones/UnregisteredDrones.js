import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { getUnregisteredDrones } from '../../redux/DroneActions'

class UnregisteredDrones extends React.Component {

  componentDidMount() {
    this.props.getUnregisteredDrones();
    console.log('componentDidMount called');
  }

  render() {
    return (<div>
      {this.props.unregisteredDrones.map(d => {
        console.log(d.id);
        return (<p>{d.id}</p>)
      })}
    </div>);
  }
}

const mapDispatchToProps = { getUnregisteredDrones };
const mapStateToProps = state => {
  return {
    unregisteredDrones: state.unregisteredDrones
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(UnregisteredDrones));