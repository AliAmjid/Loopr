import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import ExamInfoDialog from 'pages/teacherSubjects/subject/pointSystem/edit/examInfoDialog';
import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION from 'pages/teacherSubjects/subject/pointSystem/mutation/createOrUpdatePointSystem';

import {
  TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation,
  TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutationVariables,
} from 'types/graphql';

import { getPercents, getPoints } from 'components/percents';

import { Exam } from '../types';

import Edit from './edit';
import {
  EditIndexProps,
  EditStudents,
  ExamInfoDialogSubmitValues,
  StudentExamChangeValues,
} from './types';

const EditIndex: React.FC<EditIndexProps> = props => {
  const [students, setStudents] = useState<EditStudents>([]);
  const [exam, setExam] = useState<Exam>({
    id: '',
    name: '',
    maxPoints: 0,
  });
  const [examInfoDialog, setExamInfoDialog] = useState(false);
  const [
    createOrUpdatePointSystem,
    { loading: createOrUpdatePointSystemLoading },
  ] = useMutation<
    TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation,
    TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutationVariables
  >(
    TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION,
    {
      refetchQueries: ['TeacherSubjectsSubjectPointSystemSubjectQuery'],
      awaitRefetchQueries: true,
    },
  );
  const { enqueueSnackbar } = useSnackbar();

  const foundExam = props.exams.find(exam => exam.id === props.examId);
  useEffect(() => {
    if (foundExam) {
      setStudents(
        props.students.map(student => {
          const studentExam = student.exams.find(
            exam => exam.id === props.examId,
          );
          let pointsValue = 'N';
          let percentsValue = 'N';
          if (studentExam?.examWritten) {
            pointsValue = `${studentExam.points}`;
            percentsValue = `${getPercents({
              value: studentExam.points,
              max: exam.maxPoints,
            })}`;
          }

          return {
            ...student,
            pointsValue,
            pointsError: false,
            pointsWarning: false,
            percentsValue,
            percentsError: false,
            percentsWarning: false,
          };
        }),
      );

      setExam(foundExam);
    }
  }, [props.students, props.examId, props.exams]);

  const studentExamChangeHandler = (values: StudentExamChangeValues): void => {
    const newStudents = [...students];
    const student = newStudents.find(
      student => student.id === values.studentId,
    );
    if (student) {
      if (values.points !== undefined) {
        student.pointsValue = values.points;
        student.pointsError =
          values.points !== 'N' &&
          values.points !== 'n' &&
          Number.isNaN(+values.points);
        student.pointsWarning =
          !Number.isNaN(+values.points) &&
          (+values.points < 0 ||
            (exam?.maxPoints !== undefined && +values.points > exam.maxPoints));

        if (
          !Number.isNaN(+values.points) &&
          exam.maxPoints !== 0 &&
          values.points !== ''
        ) {
          student.percentsValue = `${getPercents({
            value: +values.points,
            max: exam.maxPoints,
          })}`;
        } else if (values.points === 'n' || values.points === 'N') {
          student.percentsValue = values.points;
        } else {
          student.percentsValue = '-';
        }
      }
      if (values.percents !== undefined) {
        student.percentsValue = values.percents;
        student.percentsError =
          values.percents !== 'N' &&
          values.percents !== 'n' &&
          Number.isNaN(+values.percents);
        student.percentsWarning =
          !Number.isNaN(+values.percents) &&
          (+values.percents < 0 || +values.percents > 100);

        if (!Number.isNaN(+values.percents) && values.percents !== '') {
          student.pointsValue = `${Math.round(
            getPoints({
              max: exam.maxPoints,
              percents: +values.percents,
            }),
          )}`;
        } else if (values.percents === 'n' || values.percents === 'N') {
          student.pointsValue = values.percents;
        } else {
          student.pointsValue = '-';
        }
      }
    }
    setStudents(newStudents);
  };

  const submitHandler = (): void => {
    if (students.some(student => student.pointsError)) {
      enqueueSnackbar('No no no', { variant: 'warning' });
    } else {
      createOrUpdatePointSystem({
        variables: {
          input: {
            exam: exam.id,
            maxPoints: exam.maxPoints,
            points: students.map(student => {
              const examWritten =
                student.pointsValue !== 'N' && student.pointsValue !== 'n';

              return {
                user: student.id,
                points: examWritten ? +student.pointsValue : 0,
                examWritten,
              };
            }),
          },
        },
      })
        .then(() => {
          enqueueSnackbar('S', { variant: 'success' });
          props.onClose();
        })
        .catch(() => {
          enqueueSnackbar('E', { variant: 'error' });
        });
    }
  };

  return (
    <>
      <ExamInfoDialog
        open={examInfoDialog}
        defaultValues={{ name: exam.name, maxPoints: exam.maxPoints }}
        onSubmit={(values: ExamInfoDialogSubmitValues) => {
          setExamInfoDialog(false);
          setExam(prevState => ({
            ...prevState,
            name: values.name,
            maxPoints: +values.maxPoints,
          }));
        }}
        onClose={() => setExamInfoDialog(false)}
      />
      <Edit
        open={props.open}
        exam={exam}
        students={students}
        onCancel={props.onClose}
        onSubmit={submitHandler}
        onStudentExamChange={studentExamChangeHandler}
        onExamInfoEdit={() => {
          setExamInfoDialog(true);
        }}
      />
    </>
  );
};

export default EditIndex;
