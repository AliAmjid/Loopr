import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { PercentsToMarkDialogProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: theme.spacing(5),
  },
  table: {
    width: '100%',
  },
  cell: {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
}));

const PercentsToMarkDialog: React.FC<PercentsToMarkDialogProps> = props => {
  const classes = useStyles();
  const [percents, setPercents] = useState(props.defaultValues);

  useEffect(() => {
    setPercents(props.defaultValues);
  }, [props.defaultValues]);

  const oneError = +percents.one < 0 || +percents.one > 100;
  const twoError = +percents.two < 0 || +percents.two > 100;
  const threeError = +percents.three < 0 || +percents.three > 100;
  const fourError = +percents.four < 0 || +percents.four > 100;

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogContent>
          <table className={classes.table}>
            <tr>
              <td className={classes.cell}>
                <Typography>Spodní hranice</Typography>
              </td>
              <td className={classes.cell}>
                <Typography>Odpovídající známka</Typography>
              </td>
            </tr>
            <tr>
              <td className={classes.cell}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <TextField
                    className={classes.textField}
                    type="number"
                    value={percents.one}
                    onChange={e => {
                      const { value } = e.target;

                      setPercents(prevState => ({
                        ...prevState,
                        one: value,
                      }));
                    }}
                    error={oneError}
                  />
                  %
                </Box>
              </td>
              <td className={classes.cell}>
                <Typography variant="subtitle1">1</Typography>
              </td>
            </tr>
            <tr>
              <td className={classes.cell}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <TextField
                    className={classes.textField}
                    type="number"
                    value={percents.two}
                    onChange={e => {
                      const { value } = e.target;

                      setPercents(prevState => ({
                        ...prevState,
                        two: value,
                      }));
                    }}
                    error={twoError}
                  />
                  %
                </Box>
              </td>
              <td className={classes.cell}>
                <Typography variant="subtitle1">2</Typography>
              </td>
            </tr>
            <tr>
              <td className={classes.cell}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <TextField
                    className={classes.textField}
                    type="number"
                    value={percents.three}
                    onChange={e => {
                      const { value } = e.target;

                      setPercents(prevState => ({
                        ...prevState,
                        three: value,
                      }));
                    }}
                    error={threeError}
                  />
                  %
                </Box>
              </td>
              <td className={classes.cell}>
                <Typography variant="subtitle1">3</Typography>
              </td>
            </tr>
            <tr>
              <td className={classes.cell}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <TextField
                    className={classes.textField}
                    type="number"
                    value={percents.four}
                    onChange={e => {
                      const { value } = e.target;
                      setPercents(prevState => ({
                        ...prevState,
                        four: value,
                      }));
                    }}
                    error={fourError}
                  />
                  %
                </Box>
              </td>
              <td className={classes.cell}>
                <Typography variant="subtitle1">4</Typography>
              </td>
            </tr>
          </table>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel}>
            cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={oneError || twoError || threeError || fourError}
            onClick={() => props.onSubmit(percents)}
          >
            save
          </Button>
        </DialogActions>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default PercentsToMarkDialog;