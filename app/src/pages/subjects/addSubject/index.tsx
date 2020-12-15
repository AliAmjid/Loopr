import React from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  SubjectsAddSubjectCreateSubjectMutataion,
  SubjectsAddSubjectCreateSubjectMutataionVariables,
} from 'types/graphql';

import EditSubject from 'components/EditSubject';
import { SubmitArgs } from 'components/EditSubject/types';
import withPage from 'components/withPage';

import SUBJECTS_ADD_SUBJECT_CREATE_SUBJECT_MUTATION from './mutations/create';
import addSubjectPageOptions from './pageOptions';

const AddSubjectIndex: React.FC = () => {
  const [createSubject] = useMutation<
    SubjectsAddSubjectCreateSubjectMutataion,
    SubjectsAddSubjectCreateSubjectMutataionVariables
  >(SUBJECTS_ADD_SUBJECT_CREATE_SUBJECT_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation(namespaces.pages.subjects.addSubject);

  const submitHandler = (args: SubmitArgs): Promise<void> => {
    return createSubject({
      variables: {
        input: { ...args, subjectType: `${router.query.subjectTypeId}` },
      },
    })
      .then(() => {
        enqueueSnackbar(t('snackbars.add.success'), { variant: 'success' });
        router.push(routes.subjects.index);
      })
      .catch(() => {
        enqueueSnackbar(t('snackbars.add.error'), { variant: 'error' });
      });
  };

  return (
    <EditSubject
      submitButtonLabel={t('common:actions.add')}
      onSubmit={submitHandler}
    />
  );
};

export default withPage(addSubjectPageOptions)(AddSubjectIndex);
