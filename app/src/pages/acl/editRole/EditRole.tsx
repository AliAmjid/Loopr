import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { EditRoleProps } from 'pages/acl/editRole/types';

import addRolePrefix from 'components/addRolePrefix';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import SimpleDialog from 'components/SimpleDialog';
import stripRolePrefix from 'components/stripRolePrefix';

const EditRole: React.FC<EditRoleProps> = ({
  role,
  loading,
  onSubmit,
  onDelete,
}) => {
  const [values, setValues] = useState({ name: { value: '', error: false } });
  const [deleting, setDeleting] = useState(false);
  const { t } = useTranslation(namespaces.pages.acl.editRole);

  useEffect(() => {
    setValues(values => ({
      ...values,
      name: { value: stripRolePrefix(role.name), error: false },
    }));
  }, [role]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (values.name.value.length < 0) {
      setValues(values => ({
        ...values,
        name: { ...values.name, error: true },
      }));

      return;
    }
    setValues(values => ({
      ...values,
      name: { ...values.name, error: false },
    }));
    onSubmit({ name: addRolePrefix(values.name.value) });
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValues(values => ({
      ...values,
      name: { ...values.name, value },
    }));
  };

  const deleteHandler = (): void => {
    onDelete().then(() => {
      setDeleting(false);
    });
  };

  return (
    <>
      <Paper>
        <OverlayLoadingContainer>
          <OverlayLoading loading={loading} />
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Role</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t('name')}
                  value={values.name.value}
                  onChange={nameChangeHandler}
                />
              </Grid>
              <Grid item container justify="flex-end" xs={12}>
                <Box mr={2}>
                  <Link href={routes.acl.index}>
                    <Button color="primary">
                      {t('common:actions.cancel')}
                    </Button>
                  </Link>
                </Box>
                <Box mr={2}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setDeleting(true)}
                  >
                    {t('common:actions.delete')}
                  </Button>
                </Box>
                <Button color="primary" variant="contained" type="submit">
                  {t('common:actions.save')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </OverlayLoadingContainer>
      </Paper>
      <SimpleDialog
        open={deleting}
        title={t('deleteTitle')}
        content={<Typography>{t('irreversibleAction')}</Typography>}
        actions={[
          <Button key={0} color="primary" onClick={() => setDeleting(false)}>
            {t('common:actions.cancel')}
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={deleteHandler}
          >
            {t('common:actions.delete')}
          </Button>,
        ]}
      />
    </>
  );
};

export default EditRole;
