import React, { useState } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import SimpleDialog from 'components/SimpleDialog';

import { Subject as SubjectT, SubjectProps } from './types';

const Subject: React.FC<SubjectProps> = props => {
  const { t } = useTranslation(namespaces.pages.subjects.index);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!props.selectedSubjectType)
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>{t('nothingSelected')}</Typography>
      </Box>
    );

  return (
    <Box p={2}>
      <SimpleDialog
        loading={deleteLoading}
        open={Boolean(deleteId)}
        title={t('deleteDialog.title')}
        content={<Typography>{t('deleteDialog.description')}</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setDeleteId(undefined)}
          >
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              setDeleteLoading(true);
              props.onDelete(`${deleteId}`).then(successful => {
                setDeleteLoading(false);
                if (successful) setDeleteId(undefined);
              });
            }}
          >
            {t('common:actions.delete')}
          </Button>,
        ]}
      />
      <MaterialTable
        key={`${props.selectedSubjectType}-${deleteLoading}`}
        title={t('subjects')}
        uniqueName="pages/subjects/subject/subject"
        columns={[
          {
            title: `${t('group')}/${t('classGroup')}`,
            render: (row: SubjectT) => {
              if (row.classGroup)
                return `${row.classGroup.year} ${row.classGroup.section}`;
              if (row.group) return row.group.section;

              return '-';
            },
          },
          {
            title: t('teacher'),
            render: (row: SubjectT) =>
              `${row.teacher?.firstname} ${row.teacher?.lastname}`,
          },
        ]}
        options={{ filtering: false, exportButton: true }}
        data={(query: Query<SubjectT>) =>
          props.onGetSubjects(query).then(res => ({
            totalCount: res.totalCount,
            data: res.subjects,
            page: query.page,
          }))
        }
        actions={[
          {
            icon: DeleteIcon,
            tooltip: t('common:actions.delete'),
            onClick: (_, row) => {
              row = row as SubjectT;
              setDeleteId(row.id);
            },
          },
          {
            icon: EditIcon,
            tooltip: t('common:actions.edit'),
            onClick: (_, row) => {
              row = row as SubjectT;
              props.onEdit(row.id);
            },
          },
        ]}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={props.onAddClick}>
          {t('common:actions.add')}
        </Button>
      </Box>
    </Box>
  );
};

export default Subject;
