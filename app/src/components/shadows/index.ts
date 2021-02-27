import { CSSProperties } from '@material-ui/styles/withStyles/withStyles';

const shadowSize = 5;

export const leftShadow: CSSProperties = {
  boxShadow: `-${shadowSize}px 0px 4px -1px rgba(0,0,0,0.2)`,
};

export const rightShadow: CSSProperties = {
  boxShadow: `${shadowSize}px 0px 4px -1px rgba(0,0,0,0.2)`,
};

export const bottomShadow: CSSProperties = {
  boxShadow: `0px ${shadowSize}px 4px -1px rgba(0,0,0,0.2)`,
};
export const topShadow = (intensity: number): CSSProperties => ({
  boxShadow: `0px -${shadowSize}px 4px -1px rgba(0,0,0,${0.2 * intensity})`,
});
