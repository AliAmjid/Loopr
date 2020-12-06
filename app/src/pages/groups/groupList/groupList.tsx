import React, { useState } from 'react';

import { Button, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { GroupListProps } from 'pages/groups/groupList/types';

import SideList from 'components/SideList';
import SimpleDialog from 'components/SimpleDialog';

import AddDialog from './addDialog';

const GroupList: React.FC<GroupListProps> = props => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | undefined>(undefined);

  return (
    <>
      <SimpleDialog
        open={Boolean(deleting)}
        title="Sure delete?"
        content={<Typography>Irreversible</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => {
              setDeleting(undefined);
            }}
          >
            Cancel
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              props.onDelete(deleting);
              setDeleting(undefined);
            }}
          >
            Delete
          </Button>,
        ]}
      />
      <AddDialog
        open={addOpen}
        loading={props.addGroupLoading}
        onSubmit={values => {
          props.onAdd(values).then((success: boolean) => {
            if (success) setAddOpen(false);
          });
        }}
        onClose={() => {
          setAddOpen(false);
        }}
      />
      <SideList
        title="Groups"
        loading={props.groupsLoading}
        bottomAction={{
          icon: <AddIcon />,
          onClick: () => {
            setAddOpen(true);
          },
        }}
        items={props.groups.map(group => ({
          id: group.id,
          primary: group?.section,
          onValueChange: (value: string) =>
            props.onUpdate({ id: group.id, section: value }),
          onClick: () => props.onSelectedGroupChange(group.id),
          additionalActions: [
            <IconButton key={0} onClick={() => setDeleting(group.id)}>
              <DeleteIcon />
            </IconButton>,
          ],
        }))}
      />
    </>
  );
};

export default GroupList;
