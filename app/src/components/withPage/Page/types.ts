import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  onLogOut: () => void;
}>;
