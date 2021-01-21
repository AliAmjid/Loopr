import React from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { getMark, getPercents } from 'components/percents';
import ThickDivider from 'components/thickDivider';

import { PointSystemDetailProps } from './types';

const useStyles = makeStyles(() => ({
  cardContent: {
    padding: `0px !important`,
  },
}));

const PointSystemDetail: React.FC<PointSystemDetailProps> = props => {
  const classes = useStyles();
  const { t } = useTranslation(namespaces.pages.studentSubjects.index);

  const CustomCard: React.FC = props => {
    return (
      <Card variant="outlined">
        <CardContent className={classes.cardContent}>
          {props.children}
        </CardContent>
      </Card>
    );
  };

  const numberPercents = getPercents({
    value: props.exam.pointSystem?.points || 0,
    max: props.exam.pointSystem?.maxPoints || 0,
  });
  let percents = '-';
  if (props.exam.pointSystem?.maxPoints !== 0) percents = `${numberPercents}%`;

  let mark = 5;
  if (props.subject.percentsToMarkConvert) {
    mark = getMark({
      percents: numberPercents,
      percentsToMarkConvert: props.subject.percentsToMarkConvert,
    });
  }

  return (
    <>
      <Typography variant="h3">
        {t('pointSystem.personalEvaluation')}
      </Typography>
      <ThickDivider />
      <Box pt={2} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CustomCard>
            <Typography>
              {t('common:gqlObjects.point.points.nominative')}
            </Typography>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Typography variant="h3">
                {props.exam.pointSystem?.points}
              </Typography>
              <Box pb={0.4} pl={0.8}>
                <Typography>
                  {`z ${props.exam.pointSystem?.maxPoints}`}
                </Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
        <Grid item xs={4}>
          <CustomCard>
            <Typography>{t('common:gqlObjects.point.percents')}</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="h3">{percents}</Typography>
            </Box>
          </CustomCard>
        </Grid>
        <Grid item xs={4}>
          <CustomCard>
            <Typography>{t('common:gqlObjects.point.mark')}</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="h3">{`${mark}`}</Typography>
            </Box>
          </CustomCard>
        </Grid>
      </Grid>
      <Box pt={2}>
        <Typography variant="h3">
          {t('pointSystem.comparisonToClass')}
        </Typography>
        <ThickDivider />
        <Box pt={2} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomCard>
              <Typography>{t('pointSystem.classPointAverage')}</Typography>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Typography variant="h3">
                  {props.exam.pointSystem?.average}
                </Typography>
                <Box pb={0.4} pl={0.8}>
                  <Typography>
                    {`z ${props.exam.pointSystem?.maxPoints}`}
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          </Grid>
          <Grid item xs={4}>
            <CustomCard>
              <Typography>{t('common:gqlObjects.point.percentil')}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h3">{`${props.exam.pointSystem?.percentil}`}</Typography>
              </Box>
            </CustomCard>
          </Grid>
          <Grid item xs={4}>
            <CustomCard>
              <Typography>{t('pointSystem.studentsBetterThanYou')}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h3">
                  {`${props.exam.pointSystem?.worstThan}`}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PointSystemDetail;
