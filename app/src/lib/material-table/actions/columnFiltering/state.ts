import create from 'zustand';

const useColumnFilteringState = create(set => ({
  open: false,
  selected: [],
  setOpen: (open: boolean) => set({ open }),
  setDefaultColumns: (defaultColumns: string[]) =>
    set({
      defaultColumns,
    }),
  setSelected: (selected: string[]) => {
    return set({
      selected,
    });
  },
}));

export default useColumnFilteringState;
