import React from 'react';

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import PointSystem from './pointSystem';
import { ExamsProps } from './types';

const useStyles = makeStyles({
  paper: {
    overflowX: 'auto',
  },
});

const Exams: React.FC<ExamsProps> = props => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.pages.dashboard.index);

  return (
    <Paper className={classes.paper}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <Typography variant="h6">{t('latestEvaluation')}</Typography>
        <Table size="small">
          <TableBody>
            {props.exams.map(exam => {
              switch (exam.subject?.evaluationSystem || '') {
                case 'POINTS':
                  return <PointSystem exam={exam} user={props.user} />;
                default:
                  return <></>;
              }
            })}
          </TableBody>
        </Table>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default Exams;
