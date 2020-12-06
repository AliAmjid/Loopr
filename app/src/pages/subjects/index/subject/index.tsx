import React from 'react';

import { useRouter } from 'next/router';

import routes from 'config/routes';

import useSubjectsState from '../state';

import Subject from './subject';

const SubjectIndex: React.FC = () => {
  const { selectedSubject } = useSubjectsState(state => ({
    selectedSubject: state.selectedSubject,
  }));
  const router = useRouter();

  const addClickHandler = (): void => {
    router.push({
      pathname: routes.subjects.addSubject,
      query: {
        subjectTypeId: selectedSubject,
      },
    });
  };

  return (
    <Subject selectedSubject={selectedSubject} onAddClick={addClickHandler} />
  );
};
export default SubjectIndex;
