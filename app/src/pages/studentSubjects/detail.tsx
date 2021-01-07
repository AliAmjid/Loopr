import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { bottomShadow } from 'components/shadows';
import SideDialog from 'components/SideDialog';

import PointSystemDetail from './pointSystem/detail';
import { DetailProps, Exam, Subject } from './types';

const useStyles = makeStyles(() => ({
  header: { ...bottomShadow },
  headerInfo: {
    minWidth: 150,
  },
  headerActions: {
    width: '100%',
  },
}));
const Detail: React.FC<DetailProps> = props => {
  const classes = useStyles();
  const [exam, setExam] = useState<Exam | undefined>(undefined);
  const [subject, setSubject] = useState<Subject | undefined>(undefined);

  const currentExam = props.subject?.exams.find(
    exam => exam.id === props.examId,
  );
  useEffect(() => {
    if (currentExam) setExam(currentExam);
    if (props.subject) setSubject(props.subject);
  }, [props.subject, props.examId]);

  const open = currentExam !== undefined;

  return (
    <SideDialog open={open}>
      <Box p={2} display="flex" alignItems="center" className={classes.header}>
        <Box className={classes.headerInfo}>
          <Typography>{subject?.subjectType}</Typography>
          <Typography variant="h5"> {exam?.name}</Typography>
          <Typography>27.12.2020</Typography>
        </Box>

        <Box
          className={classes.headerActions}
          display="flex"
          justifyContent="flex-end"
        >
          <Button color="primary" variant="contained" onClick={props.onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Box p={2}>
        {exam && open && subject?.evaluationSystem === 'POINTS' && (
          <PointSystemDetail exam={exam} subject={subject} />
        )}
      </Box>
    </SideDialog>
  );
};

export default Detail;
