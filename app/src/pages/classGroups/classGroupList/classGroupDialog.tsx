import React from 'react';

import {
  Box,
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

import { ClassGroupDialogFormValues, ClassGroupDialogProps } from './types';

const ClassGroupDialog: React.FC<ClassGroupDialogProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);
  const { handleSubmit, register, errors } = useForm<
    ClassGroupDialogFormValues
  >();

  const submitHandler = (values: ClassGroupDialogFormValues): void => {
    props.onSubmit({ section: values.name, year: +values.year });
  };

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <DialogTitle>{props.title}</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <Box pb={2}>
              <TextField
                name="year"
                label={t('common:gqlObjects.classGroup.year')}
                type="number"
                fullWidth
                inputRef={register({ required: true })}
                error={errors.year !== undefined}
                defaultValue={props.defaultValues?.year || ''}
              />
            </Box>

            <TextField
              name="name"
              label={t('common:gqlObjects.classGroup.section')}
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
              defaultValue={props.defaultValues?.section || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={props.onClose}>
              {t('common:actions.cancel')}
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {props.primaryButtonLabel}
            </Button>
          </DialogActions>
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default ClassGroupDialog;
