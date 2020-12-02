import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';

import SideTable from 'components/SideTable';

import AddDialog from './addDialog';
import { ClassListProps } from './types';

const ClassList: React.FC<ClassListProps> = props => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <AddDialog
        open={addOpen}
        loading={props.addClassLoading}
        onSubmit={values => {
          props.onAdd(values).then((success: boolean) => {
            if (success) setAddOpen(false);
          });
        }}
        onClose={() => {
          setAddOpen(false);
        }}
      />
      <SideTable
        title="Classes"
        loading={props.classesLoading}
        bottomAction={{
          icon: <AddIcon />,
          onClick: () => {
            setAddOpen(true);
          },
        }}
        items={props.classes.map(cl => ({
          id: cl.id,
          primary: cl?.section,
          onValueChange: (value: string) =>
            props.onUpdate({ id: cl.id, section: value }),
          onClick: () => props.onSelectedClassChange(cl.id),
        }))}
      />
    </>
  );
};

export default ClassList;
