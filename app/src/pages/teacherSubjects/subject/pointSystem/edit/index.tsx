import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import ExamInfoDialog from 'pages/teacherSubjects/subject/pointSystem/edit/examInfoDialog';
import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION from 'pages/teacherSubjects/subject/pointSystem/mutation/createOrUpdatePointSystem';
import TEACHER_SUBJECTS_SUBJECT_POINTS_SYSTEM_DELETE_EXAM_MUTATION from 'pages/teacherSubjects/subject/pointSystem/mutation/deleteExam';

import {
  TeacherSubjectsSubjectPointsSystemDeleteExamMutation,
  TeacherSubjectsSubjectPointsSystemDeleteExamMutationVariables,
  TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation,
  TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutationVariables,
} from 'types/graphql';

import { getPercents, getPoints } from 'components/percentMark';
import SimpleDialog from 'components/SimpleDialog';

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
    writtenAt: '',
  });
  const [examInfoDialog, setExamInfoDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
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
  const [deleteExam, { loading: deleteExamLoading }] = useMutation<
    TeacherSubjectsSubjectPointsSystemDeleteExamMutation,
    TeacherSubjectsSubjectPointsSystemDeleteExamMutationVariables
  >(TEACHER_SUBJECTS_SUBJECT_POINTS_SYSTEM_DELETE_EXAM_MUTATION, {
    refetchQueries: ['TeacherSubjectsSubjectPointSystemSubjectQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  useEffect(() => {
    if (exam) {
      setStudents(
        props.students.map(student => {
          const studentExam = student.exams.find(
            exam => exam.id === props.examId,
          );
          let pointsValue = 'N';
          let percentsValue = 'N';
          if (studentExam?.examWritten) {
            pointsValue = `${studentExam.points}`;
            if (exam.maxPoints === 0) {
              percentsValue = '-';
            } else {
              percentsValue = `${getPercents({
                value: studentExam.pointsNumber,
                max: exam.maxPoints,
              })}`;
            }
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
    }
  }, [props.students, props.exams, exam]);

  const foundExam = props.exams.find(exam => exam.id === props.examId);
  useEffect(() => {
    if (foundExam) setExam(foundExam);
  }, [props.exams, props.examId]);

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
          !Number.isInteger(+values.points);
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
          student.pointsValue = `${getPoints({
            max: exam.maxPoints,
            percents: +values.percents,
          })}`;
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
    if (
      students.some(student => student.pointsError || student.percentsError)
    ) {
      enqueueSnackbar(t('snackbars.createOrUpdatePointSystem.invalid'), {
        variant: 'warning',
      });
    } else {
      createOrUpdatePointSystem({
        variables: {
          pointSystemInput: {
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
          examInput: {
            id: exam.id,
            name: exam.name,
            writtenAt: exam.writtenAt,
          },
        },
      }).then(() => {
        enqueueSnackbar(t('snackbars.createOrUpdatePointSystem.success'), {
          variant: 'success',
        });
        props.onClose();
      });
    }
  };

  const deleteHandler = (): void => {
    deleteExam({ variables: { input: { id: props.examId } } }).then(() => {
      enqueueSnackbar(t('snackbars.deleteExam.success'), {
        variant: 'success',
      });
      setDeleteDialog(false);
      props.onClose();
    });
  };

  return (
    <>
      <ExamInfoDialog
        open={examInfoDialog}
        defaultValues={{
          name: exam.name,
          maxPoints: exam.maxPoints,
          writtenAt: exam.writtenAt,
        }}
        onSubmit={(values: ExamInfoDialogSubmitValues) => {
          setExamInfoDialog(false);
          setExam(prevState => ({
            ...prevState,
            name: values.name,
            maxPoints: +values.maxPoints,
            writtenAt: values.writtenAt,
          }));
        }}
        onClose={() => setExamInfoDialog(false)}
      />
      <SimpleDialog
        open={deleteDialog}
        loading={deleteExamLoading}
        title={t('deleteExam')}
        content={<Typography>{t('irreversible')}</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setDeleteDialog(false)}
          >
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={deleteHandler}
          >
            {t('common:actions.delete')}
          </Button>,
        ]}
      />
      <Edit
        open={props.open}
        exam={exam}
        students={students}
        loading={createOrUpdatePointSystemLoading}
        onCancel={props.onClose}
        onSubmit={submitHandler}
        onStudentExamChange={studentExamChangeHandler}
        onExamInfoEdit={() => {
          setExamInfoDialog(true);
        }}
        onDelete={() => setDeleteDialog(true)}
      />
    </>
  );
};

export default EditIndex;
