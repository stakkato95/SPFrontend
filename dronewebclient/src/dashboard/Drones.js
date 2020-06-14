import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
}));

function Drones(props) {
  const classes = useStyles();
  const theme = useTheme();
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
          <Tab label="Item One"/>
          <Tab label="Item Two"/>
          <Tab label="Item Three"/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={selectedTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={selectedTab} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={selectedTab} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={selectedTab} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default Drones;