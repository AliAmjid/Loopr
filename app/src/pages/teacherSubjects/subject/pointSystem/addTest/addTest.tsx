import React, { useState } from 'react';

import { Box, Button, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { dateToDayFormat } from 'components/formatDate';
import SimpleDialog from 'components/SimpleDialog';

import { AddTestProps } from './types';

const AddTest: React.FC<AddTestProps> = props => {
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [writtenAt, setWrittenAt] = useState(dayjs());
  const [name, setName] = useState('');

  const submitHandler = (): void => {
    props
      .onExamCreate({ name, writtenAt: writtenAt.toISOString() })
      .then(success => {
        if (success) {
          setDialogOpen(false);
        }
      });
  };

  return (
    <>
      <SimpleDialog
        open={dialogOpen}
        loading={props.loading}
        title={t('addTest')}
        // prettier-ignore
        content={(
          <>
            <TextField label={t('common:gqlObjects.exam.name')} fullWidth value={name} onChange={(e)=>setName(e.target.value)} />
            <Box pt={2} />
            <KeyboardDatePicker
              label={t('common:gqlObjects.exam.writtenAt')}
              format={dateToDayFormat}
              fullWidth
              cancelLabel={t('common:actions.cancel')}
              okLabel={t('common:actions.submit')}
              onChange={date => {
                if (date) setWrittenAt(date);
              }}
              value={writtenAt}
            />
          </>
        )}
        actions={[
          <Button
            key="cancel"
            color="primary"
            onClick={() => setDialogOpen(false)}
          >
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key="add"
            color="primary"
            variant="contained"
            onClick={submitHandler}
          >
            {t('common:actions.add')}
          </Button>,
        ]}
      />
      <Button color="primary" onClick={() => setDialogOpen(true)}>
        {t('addTest')}
      </Button>
    </>
  );
};

export default AddTest;
