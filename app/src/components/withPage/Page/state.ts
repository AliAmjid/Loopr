import create from 'zustand';

import { PageState } from './types';

const usePageState = create<PageState>(set => ({
  drawerOpen: false,
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
}));

export default usePageState;
