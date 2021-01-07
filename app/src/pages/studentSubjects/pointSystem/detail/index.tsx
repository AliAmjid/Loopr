import React from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { getMark, getPercents } from 'components/percents';
import ThickDivider from 'components/thickDivider';

import { PointSystemDetailProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    padding: `0px !important`,
  },
}));

const PointSystemDetail: React.FC<PointSystemDetailProps> = props => {
  const classes = useStyles();

  const CustomCard: React.FC = props => {
    return (
      <Card variant="outlined">
        <CardContent className={classes.cardContent}>
          {props.children}
        </CardContent>
      </Card>
    );
  };

  const percents = getPercents({
    value: props.exam.pointSystem?.points || 0,
    max: props.exam.pointSystem?.maxPoints || 0,
  });

  let mark = 5;
  if (props.subject.percentsToMarkConvert) {
    mark = getMark({
      percents,
      percentsToMarkConvert: props.subject.percentsToMarkConvert,
    });
  }

  return (
    <>
      <Typography variant="h6">Osobní hodnocení</Typography>
      <ThickDivider />
      <Box pt={2} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CustomCard>
            <Typography>Bodové hodnocení</Typography>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Typography variant="h6">
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
            <Typography>Procentuálně</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="h6">{`${percents}%`}</Typography>
            </Box>
          </CustomCard>
        </Grid>
        <Grid item xs={4}>
          <CustomCard>
            <Typography>Známka</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="h6">{`${mark}`}</Typography>
            </Box>
          </CustomCard>
        </Grid>
      </Grid>
      <Box pt={2}>
        <Typography variant="h6">Porovnání v rámci třídy</Typography>
        <ThickDivider />
        <Box pt={2} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomCard>
              <Typography>Třídní bodový průměr</Typography>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Typography variant="h6">
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
              <Typography>Percentil</Typography>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6">{`${props.exam.pointSystem?.percentil}`}</Typography>
              </Box>
            </CustomCard>
          </Grid>
          <Grid item xs={4}>
            <CustomCard>
              <Typography>žáci lepší než ty</Typography>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6">?</Typography>
              </Box>
            </CustomCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PointSystemDetail;
