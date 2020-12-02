import create from 'zustand';

import { ClassesState } from './types';

const useClassesState = create<ClassesState>(set => ({
  selectedClass: undefined,
  setSelectedClass: (cl: string) => set({ selectedClass: cl }),
}));

export default useClassesState;
