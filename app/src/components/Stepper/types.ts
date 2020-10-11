export interface StepperProps {
  steps: {
    label: string;
    index: number;
    Component: JSX.Element;
    nextActive: boolean;
  }[];
}
