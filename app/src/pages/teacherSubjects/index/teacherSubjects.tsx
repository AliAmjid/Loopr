import React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

import routes from 'config/routes';

import ColorChangeDialog from 'pages/teacherSubjects/index/colorChangeDialog';

import ThickDivider from 'components/thickDivider';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: 0,
  },
  cardInnerSpacer: {
    padding: theme.spacing(1),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  colorStrip: {
    width: '100%',
    height: theme.spacing(2),
    cursor: 'pointer',
  },
  editIcon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    margin: theme.spacing(0.25),
  },
}));

const TeacherSubjects: React.FC = () => {
  const classes = useStyles();

  const card = (
    <Grid item xs={3}>
      <Card variant="outlined" className={classes.card}>
        <Box
          className={classes.colorStrip}
          style={{ backgroundColor: 'red' }}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <EditIcon className={classes.editIcon} />
        </Box>
        <div className={classes.cardInnerSpacer}>
          <CardContent>
            <Typography variant="h5">1.B</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Link href={routes.teacherSubjects.subject.index} passHref>
              <Button color="primary">Evaluation</Button>
            </Link>
          </CardActions>
        </div>
      </Card>
    </Grid>
  );

  return (
    <>
      <ColorChangeDialog open={false} />
      <Paper>
        <Typography variant="h6">Český jazyk</Typography>
        <ThickDivider />
        <Box pt={2}> </Box>

        <Grid container spacing={2}>
          {card}
          {card}
        </Grid>
      </Paper>
    </>
  );
};

export default TeacherSubjects;
