import React from 'react';

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Tabs from 'components/Tabs';

const PersonalInformationIndex: React.FC = () => {
  return (
    <Paper>
      <Box mb={2}>
        <Typography variant="h6">Osobní informace</Typography>
      </Box>

      <Tabs
        tabs={[
          {
            id: 0,
            label: 'Žák',
            panel: (
              <>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary="adam.janovsky@gmail.com"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Telefonní číslo"
                      secondary="+420 777 417 416"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Číslo OP"
                      secondary="+420 777 417 416"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Datum narození"
                      secondary="3.6.2001"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Trvalé bydliště"
                      secondary="Příčná ulice - Praha"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </>
            ),
          },
          { id: 1, label: 'Otec', panel: <div>ahoj</div> },
          { id: 2, label: 'Matka', panel: <div>ahoj</div> },
        ]}
        variant="fullWidth"
      />
    </Paper>
  );
};

export default PersonalInformationIndex;
