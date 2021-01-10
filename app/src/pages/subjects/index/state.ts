import create from 'zustand';

import { SubjectsState } from './types';

const useSubjectsState = create<SubjectsState>(set => ({
  selectedSubject: undefined,
  setSelectedSubject: (subject?: string) => set({ selectedSubject: subject }),
}));

export default useSubjectsState;
