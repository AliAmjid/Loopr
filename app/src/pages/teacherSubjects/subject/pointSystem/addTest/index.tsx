import React from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  TeacherSubejctsSubjectPointSystemCreateExamMutation,
  TeacherSubejctsSubjectPointSystemCreateExamMutationVariables,
} from 'types/graphql';

import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION from '../mutation/addExam';

import AddTest from './addTest';
import { ExamCreateValues } from './types';

const AddTestIndex: React.FC = () => {
  const [createExam, { loading: createExamLoading }] = useMutation<
    TeacherSubejctsSubjectPointSystemCreateExamMutation,
    TeacherSubejctsSubjectPointSystemCreateExamMutationVariables
  >(TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION, {
    refetchQueries: ['TeacherSubjectsSubjectPointSystemSubjectQuery'],
    awaitRefetchQueries: true,
  });
  const router = useRouter();
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );
  const { enqueueSnackbar } = useSnackbar();

  const examCreateHandler = ({
    name,
    writtenAt,
  }: ExamCreateValues): Promise<boolean> => {
    return createExam({
      variables: {
        input: {
          name,
          subject: `${router.query.id}`,
          writtenAt,
        },
      },
    })
      .then(() => {
        enqueueSnackbar(t('snackbars.createExam.success'), {
          variant: 'success',
        });

        return true;
      })
      .catch(() => false);
  };

  return (
    <AddTest loading={createExamLoading} onExamCreate={examCreateHandler} />
  );
};

export default AddTestIndex;
