import create from 'zustand';

import { EditSubjectState } from './types';

const useEditSubjectState = create<EditSubjectState>(set => ({
  group: undefined,
  classGroup: undefined,
  teacher: undefined,
  add: false,
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
  setAdd: (add: boolean) => {
    set({ add });
  },
}));

export default useEditSubjectState;
