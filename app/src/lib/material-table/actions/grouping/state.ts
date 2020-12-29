import create from 'zustand';

import { UseGroupingSate } from './types';

const useGroupingState = create<UseGroupingSate>(set => ({
  active: false,
  setActive: (active: boolean) => set({ active }),
}));

export default useGroupingState;
