import React from 'react';

import { ListItem, ListItemText } from '@material-ui/core';

import HorizontalList from 'components/HorizontalList';

import { GeneralInformationProps } from './types';

const GeneralInformation: React.FC<GeneralInformationProps> = props => {
  return (
    <>
      <HorizontalList>
        <ListItem>
          <ListItemText primary="Jméno" secondary={props.user?.name} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Příjmení"
            secondary="ALI TO JEŠTĚ NEDODĚLAL!!!"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={props.user?.username} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Role" secondary={props.user?.role.name} />
        </ListItem>
      </HorizontalList>
    </>
  );
};

export default GeneralInformation;
