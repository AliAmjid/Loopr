import create from 'zustand';

import { ClassesState } from './types';

const useClassGroupsState = create<ClassesState>(set => ({
  selectedClassGroup: undefined,
  setSelectedClassGroup: (classGroup: string) =>
    set({ selectedClassGroup: classGroup }),
}));

export default useClassGroupsState;
