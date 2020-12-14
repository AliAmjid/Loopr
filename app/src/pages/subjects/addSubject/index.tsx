import React from 'react';

import EditSubject from 'components/EditSubject';
import withPage from 'components/withPage';

import addSubjectPageOptions from './pageOptions';

const AddSubjectIndex: React.FC = () => {
  return (
    <EditSubject submitButtonLabel="Add" onSubmit={() => Promise.resolve()} />
  );
};

export default withPage(addSubjectPageOptions)(AddSubjectIndex);
