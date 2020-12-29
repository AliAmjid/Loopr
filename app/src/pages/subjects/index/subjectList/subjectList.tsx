import React, { useState } from 'react';

import { Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import SideList from 'components/SideList';
import SimpleDialog from 'components/SimpleDialog';

import AddDialog from './addDialog';
import { SubjectListProps } from './types';

const SubjectList: React.FC<SubjectListProps> = props => {
  const { t } = useTranslation(namespaces.pages.subjects.index);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  return (
    <>
      <SimpleDialog
        open={Boolean(deleteId)}
        loading={props.deleteLoading}
        title={t('deleteTypeDialog.title')}
        content={<Typography>{t('deleteTypeDialog.description')}</Typography>}
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
        title={t('listTitle')}
        loading={props.loading}
        items={props.subjects.map(subject => ({
          id: subject.id,
          primary: subject.name,
          onValueChange: value =>
            props.onSubjectUpdate({ id: subject.id, name: value }),
          onClick: () => props.onSelectedSubjectChange(subject.id),
          additionalActions: [
            <Tooltip key={0} title={`${t('common:actions.delete')}`}>
              <IconButton onClick={() => setDeleteId(subject.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>,
          ],
        }))}
        bottomAction={{
          icon: <AddIcon />,
          tooltip: t('common:actions.add'),
          onClick: () => {
            setAddOpen(true);
          },
        }}
      />
    </>
  );
};

export default SubjectList;
