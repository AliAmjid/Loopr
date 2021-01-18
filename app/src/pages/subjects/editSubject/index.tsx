import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION from 'pages/subjects/editSubject/mutations/update';

import {
  SubjectsEditSubjectSubjectQuery,
  SubjectsEditSubjectSubjectQueryVariables,
  SubjectsEditSubjectUpdateSubjectMutation,
  SubjectsEditSubjectUpdateSubjectMutationVariables,
} from 'types/graphql';

import EditSubject from 'components/EditSubject';
import { SubmitArgs } from 'components/EditSubject/types';
import withPage from 'components/withPage';

import SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY from './queries/subject';
import editSubjectPageOptions from './pageOptions';

const EditSubjectIndex: React.FC = () => {
  const router = useRouter();
  const { data: subjectData, loading: subjectLoading } = useQuery<
    SubjectsEditSubjectSubjectQuery,
    SubjectsEditSubjectSubjectQueryVariables
  >(SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY, {
    variables: { id: `${router.query.subjectId}` },
  });
  const [updateSubject] = useMutation<
    SubjectsEditSubjectUpdateSubjectMutation,
    SubjectsEditSubjectUpdateSubjectMutationVariables
  >(SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.subjects.editSubject);

  const submitHandler = (args: SubmitArgs): Promise<void> => {
    return updateSubject({
      variables: {
        input: {
          teacher: args.teacher,
          iGroupIri: args.classGroup || args.group,
          id: `${router.query.subjectId}`,
        },
      },
    }).then(() => {
      router.push(routes.subjects.index);
      enqueueSnackbar(t('snackbars.edit.success'), { variant: 'success' });
    });
  };

  return (
    <EditSubject
      defaultValues={{
        group: subjectData?.subject?.group?.id,
        classGroup: subjectData?.subject?.classGroup?.id,
        teacher: subjectData?.subject?.teacher?.id,
      }}
      loading={subjectLoading}
      submitButtonLabel={t('common:actions.edit')}
      onSubmit={submitHandler}
    />
  );
};

export default withPage(editSubjectPageOptions)(EditSubjectIndex);
