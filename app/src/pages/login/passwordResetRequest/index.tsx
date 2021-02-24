import React from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const PasswordResetRequest: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box pt={10}>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h1">Password reset</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" fullWidth>
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default PasswordResetRequest;
