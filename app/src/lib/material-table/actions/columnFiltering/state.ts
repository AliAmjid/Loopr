import create from 'zustand';

import { ColumnFilteringState } from './types';

const useColumnFilteringState = create<ColumnFilteringState>(set => ({
  open: false,
  selected: [],
  setOpen: (open: boolean) => set({ open }),
  setSelected: (selected: string[]) => {
    return set({
      selected,
    });
  },
}));

export default useColumnFilteringState;
