export interface StepperProps {
  steps: {
    label: string;
    index: number;
    component: JSX.Element;
    nextActive: boolean;
  }[];
}
