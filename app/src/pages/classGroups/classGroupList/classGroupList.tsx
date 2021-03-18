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
import EditIcon from '@material-ui/icons/Edit';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import SideList from 'components/SideList';
import SimpleDialog from 'components/SimpleDialog';
import useResources from 'components/useResources';

import ClassGroupDialog from './classGroupDialog';
import { ClassGroupListProps } from './types';

const ClassGroupList: React.FC<ClassGroupListProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [archiveId, setArchiveId] = useState<string | undefined>(undefined);

  const canDelete = useResources([[resources.group.delete]]);

  const editingClassGroup = props.classGroups.find(
    classGroup => classGroup.id === editId,
  );

  return (
    <>
      <SimpleDialog
        open={Boolean(deleteId)}
        loading={props.deleteLoading}
        title={t('sureDelete')}
        content={<Typography>{t('irreversibleAction')}</Typography>}
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
                if (successful) {
                  setDeleteId(undefined);
                }
              });
            }}
          >
            {t('common:actions.delete')}
          </Button>,
        ]}
      />
      <SimpleDialog
        open={archiveId !== undefined}
        loading={props.archiveLoading}
        title={
          props.showArchived
            ? t('archiveDialog.unarchiveTitle')
            : t('archiveDialog.archiveTitle')
        }
        content={
          props.showArchived ? undefined : (
            <Typography>{t('archiveDialog.content')}</Typography>
          )
        }
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setArchiveId(undefined)}
          >
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key={0}
            color="primary"
            variant="contained"
            onClick={() =>
              props
                .onArchive(`${archiveId}`, !props.showArchived)
                .then(success => {
                  if (success) setArchiveId(undefined);
                })
            }
          >
            {props.showArchived
              ? t('common:actions.unarchive')
              : t('common:actions.archive')}
          </Button>,
        ]}
      />
      <ClassGroupDialog
        open={addOpen || editId !== undefined}
        title={addOpen ? t('addDialogTitle') : t('editDialogTitle')}
        loading={props.addClassGroupLoading || props.updateClassGroupLoading}
        primaryButtonLabel={
          addOpen ? t('common:actions.add') : t('common:actions.edit')
        }
        onSubmit={values => {
          if (addOpen) {
            props.onAdd(values).then((success: boolean) => {
              if (success) {
                setAddOpen(false);
              }
            });
          } else if (editId) {
            props
              .onUpdate({ ...values, id: editId })
              .then((success: boolean) => {
                if (success) {
                  setEditId(undefined);
                }
              });
          }
        }}
        defaultValues={
          editId && editingClassGroup
            ? {
                year: editingClassGroup.year,
                section: editingClassGroup.section,
              }
            : undefined
        }
        onClose={() => {
          setAddOpen(false);
          setEditId(undefined);
        }}
      />
      <SideList
        title={t('listTitle')}
        loading={props.classGroupsLoading}
        bottomAction={{
          icon: <AddIcon />,
          onClick: () => {
            setAddOpen(true);
          },
          tooltip: t('common:actions.add'),
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
            label={t('showArchived')}
          />
        )}
        items={props.classGroups.map(classGroup => ({
          id: classGroup.id,
          primary: classGroup?.section,
          secondary: `${classGroup?.year}`,
          additionalActions: [
            <Tooltip key={0} title={`${t('common:actions.edit')}`}>
              <IconButton onClick={() => setEditId(classGroup.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>,
            <>
              {canDelete && (
                <Tooltip key={1} title={`${t('common:actions.delete')}`}>
                  <IconButton onClick={() => setDeleteId(classGroup.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>,
            <>
              {props.showArchived ? (
                <Tooltip key={2} title={`${t('common:actions.unarchive')}`}>
                  <IconButton onClick={() => setArchiveId(classGroup.id)}>
                    <UnarchiveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip key={2} title={`${t('common:actions.archive')}`}>
                  <IconButton onClick={() => setArchiveId(classGroup.id)}>
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>,
          ],
          onClick: () => props.onSelectedClassChange(classGroup.id),
        }))}
      />
    </>
  );
};

export default ClassGroupList;
