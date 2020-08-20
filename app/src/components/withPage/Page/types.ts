import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  loading: boolean;
  onLogOut: () => void;
}>;
