import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';

import { GroupListProps } from 'pages/groups/groupList/types';

import SideTable from 'components/SideTable';

import AddDialog from './addDialog';

const GroupList: React.FC<GroupListProps> = props => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <AddDialog
        open={addOpen}
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
          primary: `${group?.year} ${group?.section}`,
          onClick: () => {
            props.onSelectedGroupChange(group.id);
          },
        }))}
      />
    </>
  );
};

export default GroupList;
