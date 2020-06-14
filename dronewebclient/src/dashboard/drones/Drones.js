import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, AppBar, Tabs, Tab } from '@material-ui/core';

import RegisteredDrones from './RegisteredDrones';
import UnregisteredDrones from './UnregisteredDrones';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
}));

function Drones(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Registered"/>
          <Tab label="Unregistered"/>
        </Tabs>
      </AppBar>
      <SwipeableViews index={selectedTab} onChangeIndex={handleChangeIndex}>
        {selectedTab === 0 && <RegisteredDrones/> }
        {selectedTab === 1 && <UnregisteredDrones/> }
      </SwipeableViews>
    </div>
  );
}

export default Drones;