import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { AddDialogFormValues, AddDialogProps } from './types';

const AddDialog: React.FC<AddDialogProps> = props => {
  const { t } = useTranslation(namespaces.pages.subjects.index);
  const { register, errors, handleSubmit } = useForm<AddDialogFormValues>();

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <DialogTitle>{t('addDialogTitle')}</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label={t('common:gqlObjects.subjectType.name')}
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={props.onClose}>
              {t('common:actions.cancel')}
            </Button>
            <Button color="primary" variant="contained" type="submit">
              {t('common:actions.add')}
            </Button>
          </DialogActions>
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default AddDialog;
