import create from 'zustand';

import { AddSubjectState } from './types';

const useAddSubjectState = create<AddSubjectState>(set => ({
  group: undefined,
  classGroup: undefined,
  teacher: undefined,
  setGroup: (group: string) => {
    set({
      group,
      classGroup: undefined,
    });
  },
  setClassGroup: (classGroup: string) => {
    set({ classGroup, group: undefined });
  },
  setTeacher: (teacher: string) => {
    set({ teacher });
  },
}));

export default useAddSubjectState;
