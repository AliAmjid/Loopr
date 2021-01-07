import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';

import { ExamInfoDialogProps } from './types';

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = props => {
  const [name, setName] = useState('');
  const [maxPoints, setMaxPoints] = useState('');
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  useEffect(() => {
    setName(props.defaultValues.name);
    setMaxPoints(`${props.defaultValues.maxPoints}`);
  }, [props.defaultValues]);

  return (
    <Dialog open={props.open}>
      <form>
        <DialogTitle>{t('examEdit')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('common:gqlObjects.exam.name')}
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Box pt={2}>
            <TextField
              label={t('common:gqlObjects.pointSystem.maxPoints')}
              fullWidth
              type="number"
              value={maxPoints}
              error={+maxPoints < 0}
              onChange={e => setMaxPoints(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={e => {
              e.preventDefault();
              props.onSubmit({ name, maxPoints });
            }}
            disabled={+maxPoints < 0}
            type="submit"
          >
            {t('common:actions.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExamInfoDialog;
