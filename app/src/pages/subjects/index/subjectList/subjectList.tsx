import React, { useState } from 'react';

import { Button, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import SideList from 'components/SideList';
import SimpleDialog from 'components/SimpleDialog';

import AddDialog from './addDialog';
import { SubjectListProps } from './types';

const SubjectList: React.FC<SubjectListProps> = props => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  return (
    <>
      <SimpleDialog
        open={Boolean(deleteId)}
        loading={props.deleteLoading}
        title="Sure?"
        content={<Typography>Irreversible</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => {
              setDeleteId(undefined);
            }}
          >
            Cancel
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              props.onDelete(`${deleteId}`).then(successful => {
                if (successful) setDeleteId(undefined);
              });
            }}
          >
            Delete
          </Button>,
        ]}
      />
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
          onClick: () => props.onSelectedSubjectChange(subject.id),
          additionalActions: [
            <IconButton key={0} onClick={() => setDeleteId(subject.id)}>
              <DeleteIcon />
            </IconButton>,
          ],
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
