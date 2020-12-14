import create from 'zustand';

import { EditSubjectState } from './types';

const useEditSubjectState = create<EditSubjectState>(set => ({
  group: undefined,
  classGroup: undefined,
  teacher: undefined,
  setGroup: (group: string | undefined) => {
    set({
      group,
      classGroup: undefined,
    });
  },
  setClassGroup: (classGroup: string | undefined) => {
    set({ classGroup, group: undefined });
  },
  setTeacher: (teacher: string | undefined) => {
    set({ teacher });
  },
}));

export default useEditSubjectState;
