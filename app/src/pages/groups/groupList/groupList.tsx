import React, { useState } from 'react';

import {
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArchiveIcon from '@material-ui/icons/Archive';
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
  const [archiveId, setArchiveId] = useState<string | undefined>(undefined);

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
      <SimpleDialog
        open={archiveId !== undefined}
        title={t('archiveDialog.title')}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setArchiveId(undefined)}
          >
            {t('common:actions.cancel')}
          </Button>,
          <Button key={1} color="primary" variant="contained">
            {t('common:actions.archive')}
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
        // prettier-ignore
        topElement={(
          <FormControlLabel
            // prettier-ignore
            control={(
              <Switch
                color="primary"
                checked={props.showArchived}
                onChange={e => props.onShowArchivedChange(e.target.checked)}
              />
            )}
            label="Archived"
          />
        )}
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
            <Tooltip key={2} title={`${t('common:actions.archive')}`}>
              <IconButton onClick={() => setArchiveId(group.id)}>
                <ArchiveIcon />
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
