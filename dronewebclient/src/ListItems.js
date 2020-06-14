import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';  

import ContactlessIcon from '@material-ui/icons/Contactless';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import HistoryIcon from '@material-ui/icons/History';

export const MainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ContactlessIcon />
      </ListItemIcon>
      <ListItemText primary="Drones" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsEthernetIcon />
      </ListItemIcon>
      <ListItemText primary="Session" />
    </ListItem>
  </div>
);

export const SecondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary="History" />
    </ListItem>
  </div>
);