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
  Typography,
} from '@material-ui/core';

import routes from 'config/routes';

import Link from 'components/Link';
import ThickDivider from 'components/thickDivider';

const useStyles = makeStyles(() => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TeacherSubjects: React.FC = () => {
  const classes = useStyles();

  const card = (
    <Grid item xs={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">1.B</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Link href={routes.teacherSubjects.subject.index} passHref>
            <Button color="primary">Evaluation</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Paper>
      <Typography variant="h6">Český jazyk</Typography>
      <ThickDivider />
      <Box pt={2}> </Box>

      <Grid container spacing={2}>
        {card}
        {card}
      </Grid>
    </Paper>
  );
};

export default TeacherSubjects;
