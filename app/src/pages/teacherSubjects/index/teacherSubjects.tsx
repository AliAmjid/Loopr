import React, { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popover,
  Switch,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { formatDateToDay } from 'components/formatDate';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ThickDivider from 'components/thickDivider';

import ColorChangeDialogIndex from './colorChangeDialog';
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
    height: theme.spacing(2.5),
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.grey['300']}`,
  },
  editIcon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    margin: theme.spacing(0.25),
  },
}));

const TeacherSubjects: React.FC<TeacherSubjectsProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [colorChange, setColorChange] = useState<string | undefined>(undefined);
  const [popoverEl, setPopoverEl] = useState<any>(undefined);
  const { t } = useTranslation(namespaces.pages.teacherSubjects.index);

  const subjectTypes = new Map<string, Subject[]>();

  props.subjects.forEach(subject => {
    if (subject.subjectType) {
      const entry = subjectTypes.get(subject.subjectType.id);
      if (entry) {
        entry.push(subject);
        subjectTypes.set(subject.subjectType.id, entry);
      } else subjectTypes.set(subject.subjectType.id, [subject]);
    }
  });

  const mappedSubjects: JSX.Element[] = [];
  subjectTypes.forEach(subjectType => {
    mappedSubjects.push(
      <Box key={subjectType[0].subjectType?.id} pb={4}>
        <Typography variant="h3">{subjectType[0].subjectType?.name}</Typography>
        <ThickDivider />
        <Box p={2}>
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
                        backgroundColor:
                          subject.teacherCardColor || theme.palette.grey['400'],
                      }}
                      onClick={() => setColorChange(subject.id)}
                    />
                    <div className={classes.cardInnerSpacer}>
                      <CardContent>
                        <Typography variant="h2">{name}</Typography>

                        <Typography variant="subtitle1">
                          Třídy: až to Ali dodělá
                        </Typography>
                        {props.showArchived && (
                          <Typography variant="subtitle1">
                            {`Datum archivace: ${formatDateToDay(
                              `${subject.archivedAt}`,
                            )}`}
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Link
                          href={{
                            pathname: redirect,
                            query: { id: subject.id },
                          }}
                          passHref
                        >
                          <Button color="primary" fullWidth>
                            {t('evaluation')}
                          </Button>
                        </Link>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>,
    );
  });

  const archivedCheckBox = (
    <Box display="flex" justifyContent="flex-end" mb={-5}>
      <IconButton
        onClick={e => setPopoverEl(e.currentTarget)}
        style={{ zIndex: 50 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={popoverEl !== undefined}
        anchorEl={popoverEl}
        onClose={() => setPopoverEl(undefined)}
      >
        <Box p={2}>
          <FormControlLabel
            // prettier-ignore
            control={(
              <Switch
                color="primary"
                checked={props.showArchived}
                onChange={e => props.onShowArchivedChange(e.target.checked)}
              />
        )}
            label={t('showArchived')}
          />
        </Box>
      </Popover>
    </Box>
  );

  if (mappedSubjects.length === 0 && !props.loading) {
    return (
      <Paper>
        {archivedCheckBox}
        <Box display="flex" justifyContent="center">
          <Typography>
            {props.showArchived ? t('noArchivedSubjects') : t('noSubjects')}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <ColorChangeDialogIndex
        open={colorChange !== undefined}
        defaultColor={`${
          props.subjects.find(s => s.id === colorChange)?.teacherCardColor
        }`}
        subjectId={`${colorChange}`}
        onClose={() => setColorChange(undefined)}
      />
      <Paper>
        {archivedCheckBox}
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading} />
          {mappedSubjects}
        </OverlayLoadingContainer>
      </Paper>
    </>
  );
};

export default TeacherSubjects;
