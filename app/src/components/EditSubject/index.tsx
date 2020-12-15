import React, { useEffect } from 'react';

import { Paper } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import Stepper from 'components/Stepper';

import GroupsIndex from './groups';
import useEditSubjectState from './state';
import SummaryIndex from './summary';
import TeachersIndex from './teachers';
import { EditSubjectProps } from './types';

const EditSubject: React.FC<EditSubjectProps> = props => {
  const {
    group,
    classGroup,
    teacher,
    setGroup,
    setClassGroup,
    setTeacher,
  } = useEditSubjectState(state => ({
    group: state.group,
    classGroup: state.classGroup,
    teacher: state.teacher,
    setGroup: state.setGroup,
    setClassGroup: state.setClassGroup,
    setTeacher: state.setTeacher,
  }));
  const { t } = useTranslation(namespaces.components.EditSubject);

  useEffect(() => {
    setTeacher(props.defaultValues?.teacher);
    if (props.defaultValues?.classGroup)
      setClassGroup(props.defaultValues?.classGroup);
    if (props.defaultValues?.group) setGroup(props.defaultValues?.group);
  }, [props.defaultValues]);

  const submitHandler = (): Promise<void> => {
    if (teacher) {
      return props.onSubmit({ group, classGroup, teacher });
    }

    return Promise.resolve();
  };

  return (
    <Paper>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading || false} />
        <Stepper
          steps={[
            {
              index: 0,
              label: t('group/classGroup'),
              component: <GroupsIndex />,
              nextActive: group !== undefined || classGroup !== undefined,
            },
            {
              index: 1,
              label: t('teacher'),
              component: <TeachersIndex />,
              nextActive: teacher !== undefined,
            },
            {
              index: 2,
              label: t('summary'),
              component: (
                <SummaryIndex
                  submitButtonLabel={props.submitButtonLabel}
                  onSubmit={submitHandler}
                />
              ),
              nextActive: false,
            },
          ]}
        />
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default EditSubject;
