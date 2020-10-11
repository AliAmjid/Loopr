import React, { useState } from 'react';

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper as StepperPrefab,
} from '@material-ui/core';

import { StepperProps } from './types';

const Stepper: React.FC<StepperProps> = props => {
  const [activeStep, setActiveStep] = useState(0);

  const previousClickHandler = (): void => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const nextClickHandler = (): void => {
    if (activeStep < props.steps.length - 1) setActiveStep(activeStep + 1);
  };

  const currentStep = props.steps.find(step => step.index === activeStep);

  return (
    <>
      <StepperPrefab activeStep={activeStep} alternativeLabel>
        {props.steps.map(step => (
          <Step key={step.index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </StepperPrefab>
      <Box color="#000" display="flex" pb={2}>
        <Button
          color="secondary"
          variant="contained"
          disabled={activeStep <= 0}
          onClick={previousClickHandler}
        >
          previous
        </Button>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            color="primary"
            variant="contained"
            disabled={
              !currentStep?.nextActive ||
              activeStep === props.steps.length - 1 ||
              false
            }
            onClick={nextClickHandler}
          >
            next
          </Button>
        </Box>
      </Box>
      {props.steps.map(step => (
        <Box
          key={step.index}
          display={step.index === activeStep ? 'block' : 'none'}
        >
          {step.Component}
        </Box>
      ))}
    </>
  );
};

export default Stepper;
