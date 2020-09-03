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
import { useForm } from 'react-hook-form';

import routes from 'config/routes';

import { EditRoleProps } from 'pages/acl/editRole/types';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

const EditRole: React.FC<EditRoleProps> = ({ role, loading, onSubmit }) => {
  const [values, setValues] = useState({ name: { value: '', error: false } });

  useEffect(() => {
    setValues(values => ({
      ...values,
      name: { value: role.name, error: false },
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
    onSubmit({ name: values.name.value });
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues(values => ({
      ...values,
      name: { ...values.name, value: e.target.value },
    }));
  };

  return (
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
                label="name"
                value={values.name.value}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item container justify="flex-end" xs={12}>
              <Box mr={2}>
                <Button color="primary" variant="contained" type="submit">
                  Uložit
                </Button>
              </Box>
              <Grid item>
                <Link href={routes.acl.index}>
                  <Button color="secondary" variant="contained">
                    Zrušit
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default EditRole;