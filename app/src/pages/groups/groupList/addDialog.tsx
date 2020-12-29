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

import {
  AddDialogFormValues,
  AddDialogProps,
} from 'pages/groups/groupList/types';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

const AddDialog: React.FC<AddDialogProps> = props => {
  const { t } = useTranslation(namespaces.pages.groups.index);
  const { handleSubmit, register, errors } = useForm<AddDialogFormValues>();

  const submitHandler = (values: AddDialogFormValues): void => {
    props.onSubmit({ section: values.name });
  };

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogTitle>{t('addModalTitle')}</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <TextField
              name="name"
              label={t('common:gqlObjects.classGroup.section')}
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={props.onClose}>
              {t('common:actions.cancel')}
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {t('common:actions.add')}
            </Button>
          </DialogActions>
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default AddDialog;
