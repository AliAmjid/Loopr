import React, { useState } from 'react';

import { Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { GroupListProps } from 'pages/groups/groupList/types';

import SideList from 'components/SideList';
import SimpleDialog from 'components/SimpleDialog';

import AddDialog from './addDialog';

const GroupList: React.FC<GroupListProps> = props => {
  const { t } = useTranslation(namespaces.pages.groups.index);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  return (
    <>
      <SimpleDialog
        open={Boolean(deleteId)}
        loading={props.deleteLoading}
        title={t('deleteModal.title')}
        content={<Typography>{t('deleteModal.description')}</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => {
              setDeleteId(undefined);
            }}
          >
            {t('common:actions.cancel')}
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
            {t('common:actions.delete')}
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
        title={t('listTitle')}
        loading={props.groupsLoading}
        bottomAction={{
          icon: <AddIcon />,
          tooltip: t('common:actions.add'),
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
            <Tooltip key={0} title={`${t('common:actions.delete')}`}>
              <IconButton onClick={() => setDeleteId(group.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>,
          ],
        }))}
        filter={props.filter}
        onFilterChange={props.onFilterChange}
      />
    </>
  );
};

export default GroupList;
