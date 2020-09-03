import React from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import OverlayLoading from 'components/OverlayLoading';

const EditRole: React.FC = () => {
  return (
    <Paper style={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Role</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="name" />
        </Grid>
        <Grid item container justify="flex-end" xs={12}>
          <Box mr={2}>
            <Button color="primary" variant="contained">
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
      <OverlayLoading loading />
    </Paper>
  );
};

export default EditRole;
