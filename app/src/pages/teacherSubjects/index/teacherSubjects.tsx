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

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ThickDivider from 'components/thickDivider';

import { Subject, TeacherSubjectsProps } from './types';

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

const TeacherSubjects: React.FC<TeacherSubjectsProps> = props => {
  const classes = useStyles();

  const subjectTypes = new Map<string, Subject[]>();

  props.subjects.forEach(subject => {
    const entry = subjectTypes.get(subject.subjectType.id);
    if (entry) {
      entry.push(subject);
      subjectTypes.set(subject.subjectType.id, entry);
    } else {
      subjectTypes.set(subject.subjectType.id, [subject]);
    }
  });

  const mappedSubjects: JSX.Element[] = [];
  subjectTypes.forEach(subjectType => {
    mappedSubjects.push(
      <Box key={subjectType[0].subjectType.id} pb={2}>
        <Typography variant="h6">{subjectType[0].subjectType.name}</Typography>
        <ThickDivider />
        <Box pt={2}> </Box>
        <Grid container spacing={2}>
          {subjectType.map(subject => {
            let name = '';
            if (subject.group) {
              name = subject.group.section;
            }
            if (subject.classGroup) {
              name = `${subject.classGroup.year} ${subject.classGroup.section}`;
            }

            let redirect = '';
            if (subject.evaluationSystem === 'POINTS') {
              redirect = routes.teacherSubjects.subject.points;
            }

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
                <Card variant="outlined" className={classes.card}>
                  <Box
                    className={classes.colorStrip}
                    style={{
                      backgroundColor: subject.teacherCardColor || 'white',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <EditIcon className={classes.editIcon} />
                  </Box>
                  <div className={classes.cardInnerSpacer}>
                    <CardContent>
                      <Typography variant="h5">{name}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Link
                        href={{ pathname: redirect, query: { id: subject.id } }}
                        passHref
                      >
                        <Button color="primary">Evaluation</Button>
                      </Link>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>,
    );
  });

  if (mappedSubjects.length === 0 && props.loading) {
    return (
      <Paper>
        <Box display="flex" justifyContent="center">
          <Typography>No subjects</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <ColorChangeDialog open={false} />
      <Paper>
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading} />
          {mappedSubjects}
        </OverlayLoadingContainer>
      </Paper>
    </>
  );
};

export default TeacherSubjects;
