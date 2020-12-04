import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';

import SideList from 'components/SideList';

import AddDialog from './addDialog';
import { SubjectListProps } from './types';

const SubjectList: React.FC<SubjectListProps> = props => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <AddDialog
        open={addOpen}
        loading={props.addLoading}
        onSubmit={values => {
          props.onSubjectAdd(values).then(successful => {
            if (successful) {
              setAddOpen(false);
            }
          });
        }}
        onClose={() => {
          setAddOpen(false);
        }}
      />
      <SideList
        title="Subjects"
        loading={props.loading}
        items={props.subjects.map(subject => ({
          id: subject.id,
          primary: subject.name,
          onValueChange: value =>
            props.onSubjectUpdate({ id: subject.id, name: value }),
        }))}
        bottomAction={{
          icon: <AddIcon />,
          onClick: () => {
            setAddOpen(true);
          },
        }}
      />
    </>
  );
};

export default SubjectList;
