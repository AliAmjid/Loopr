import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { ColorChangeDialogProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  colorBox: {
    width: '100%',
    borderRadius: '100%',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.common.black}`,
  },
  selectedColorBox: {
    border: `4px solid ${theme.palette.primary.main}`,
  },
}));

const ColorChangeDialog: React.FC<ColorChangeDialogProps> = props => {
  const classes = useStyles();
  const [height, setHeight] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );

  const colorBoxRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().width);
    }
  }, []);

  const colors = [
    '#FF5757',
    '#FFAB57',
    '#D3FF57',
    '#57FF84',
    '#57DCFF',
    '#6C57FF',
    '#FF2A2A',
    '#FF6329',
    '#FEF735',
    '#2BFE39',
    '#2A86FF',
    '#FF57FF',
    '#000000',
    '#636363',
    '#A4A4A4',
    '#C4C4C4',
    '#E6E6E6',
    '#FFFFFF',
    '#CFBE79',
    '#774084',
    '#094B8E',
    '#7E522B',
    '#009688',
    '#FFC107',
  ];

  const getColorItem = (color: string, ref?: any): JSX.Element => {
    return (
      <Grid item xs={2} key={color}>
        <div
          key={color}
          ref={ref}
          className={`${classes.colorBox} ${
            color === selectedColor && classes.selectedColorBox
          }`}
          style={{ backgroundColor: color, height }}
          onClick={() => setSelectedColor(color)}
          role="button"
          aria-label="change color"
          tabIndex={Math.random()}
          onKeyDown={e => {
            if (e.key === 'Enter') setSelectedColor(color);
          }}
        />
      </Grid>
    );
  };

  const firsColor = getColorItem(colors[0], colorBoxRef);

  colors.splice(0, 1);

  const mappedColors = colors.map(color => getColorItem(color));

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogTitle>Change color</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap">
            <Grid container spacing={2}>
              {firsColor}
              {mappedColors}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => props.onSubmit(`${selectedColor}`)}
          >
            Save
          </Button>
        </DialogActions>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default ColorChangeDialog;
