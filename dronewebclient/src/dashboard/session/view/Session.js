import React from 'react';
import { connect } from 'react-redux';

import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import DroneInfo from './info/DroneInfo';
import SessionInfo from './info/SessionInfo';

import { getSessionAndDrone } from '../architecture/redux/SessionActions';

const styles = theme => ({
    paper: {
        padding: '16px'
    }
});

class Session extends React.Component {

    componentDidMount() {
        this.props.getSessionAndDrone();
    }

    render() {
        const { classes } = this.props;

        return (<div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <DroneInfo />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <SessionInfo />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
            </Grid>
        </div>);
    }
}

const mapDispatchToProps = { getSessionAndDrone };

export default withStyles(styles)(connect(null, mapDispatchToProps)(Session));