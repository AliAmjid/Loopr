import React, { useEffect, useState } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  Theme,
  useTheme,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { bottomShadow } from 'components/shadows';
import SideDialogContainer from 'components/SideDialog/SideDialogContainer';

import Detail from './detail';
import PointSystemIndex from './pointSystem';
import { DetailState, StudentSubjectsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
  },
  header: {
    ...bottomShadow,
    zIndex: 110,
  },
  periodSelect: {
    minWidth: theme.spacing(20),
  },
}));

const StudentSubjects: React.FC<StudentSubjectsProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [detail, setDetail] = useState<DetailState>(undefined);
  const { t } = useTranslation(namespaces.pages.studentSubjects.index);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const toolbarHeight = 64;
    if (process.browser) {
      setHeight(window.innerHeight - toolbarHeight * 3.9);
    }
  }, []);

  const mappedSchoolPeriods = props.schoolPeriods.map(schoolPeriod => {
    return (
      <MenuItem key={schoolPeriod.id} value={schoolPeriod.id}>
        {`${schoolPeriod.quarter}. ${schoolPeriod.schoolYear}`}
      </MenuItem>
    );
  });

  return (
    <Paper className={classes.root}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <SideDialogContainer>
          <Box
            className={classes.header}
            position="relative"
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <FormControl>
              <InputLabel id="schoolPeriodSelectLabel">
                {t('common:gqlObjects.schoolPeriod.name')}
              </InputLabel>
              <Select
                className={classes.periodSelect}
                labelId="schoolPeriodSelectLabel"
                multiple
                value={props.selectedSchoolPeriods}
                onChange={e =>
                  props.onSchoolPeriodsChange(
                    (e.target.value as string[]).filter(i => i !== 'all'),
                  )
                }
              >
                {mappedSchoolPeriods}
              </Select>
            </FormControl>
          </Box>
          <TableContainer style={{ height }}>
            <Table>
              <TableBody>
                {props.subjects.map((subject, index) => {
                  const color =
                    index % 2 === 0
                      ? theme.palette.common.white
                      : theme.palette.grey['100'];

                  if (subject.evaluationSystem === 'POINTS') {
                    return (
                      <PointSystemIndex
                        key={subject.id}
                        subject={subject}
                        maxExams={props.maxExams}
                        color={color}
                        onDetail={examId => {
                          setDetail({
                            examId,
                            subject,
                          });
                        }}
                      />
                    );
                  }

                  return <React.Fragment key={subject.id} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Detail {...detail} onCancel={() => setDetail(undefined)} />
        </SideDialogContainer>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default StudentSubjects;
