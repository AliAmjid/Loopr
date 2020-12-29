import create from 'zustand';

import { GroupsState } from './types';

const useGroupsState = create<GroupsState>(set => ({
  selectedGroup: undefined,
  setSelectedGroup: (group: string) => set({ selectedGroup: group }),
}));

export default useGroupsState;
