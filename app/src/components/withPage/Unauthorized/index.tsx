import React from 'react';

import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PanToolIcon from '@material-ui/icons/PanTool';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import Link from 'next/link';
import { useRouter } from 'next/router';

import routes from 'config/routes';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
  },
}));

const Unauthorized: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Grid container item justify="center">
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1">
            Nepovedlo se ověřit vaší identitu
          </Typography>
          <List subheader={<ListSubheader>Možné příčiny</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <TimerOffIcon />
              </ListItemIcon>
              <ListItemText>Vaše přihlášní vypršelo</ListItemText>
              <ListItemSecondaryAction>
                <Link href={routes.login.index} passHref>
                  <Button color="primary">Přihlásit se</Button>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText>Nejste přihlášen/a</ListItemText>
              <ListItemSecondaryAction>
                <Link href={routes.login.index} passHref>
                  <Button color="primary">Přihlásit se</Button>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PanToolIcon />
              </ListItemIcon>
              <ListItemText>Nemáte dostatečné pravomoce</ListItemText>
              <ListItemSecondaryAction>
                <Button color="primary" onClick={router.back}>
                  Zpět
                </Button>

                <Link href={routes.dashboard.index} passHref>
                  <Button color="primary">Na přehled</Button>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default Unauthorized;
