import { useState } from 'react';

import { ChangedState, ChangeItems, UseSelectionChange } from './types';

const useSelectionChange = (): UseSelectionChange => {
  const [defaultItems, setDefaultItems] = useState<ChangedState>([]);
  const [changed, setChanged] = useState<ChangedState>([]);

  const change = (items: ChangeItems): void => {
    setChanged(prevState => {
      const removeItems = defaultItems.filter(
        defaultItem =>
          // remove unchecked
          (!items.some(item => defaultItem.id === item.id) &&
            !defaultItem.selected) ||
          // remove checked
          items.some(
            item =>
              defaultItem.id === item.id &&
              defaultItem.selected === item.tableData?.checked,
          ),
      );
      const addItems = defaultItems.filter(
        defaultItem =>
          // add unchecked
          (!items.some(item => defaultItem.id === item.id) &&
            defaultItem.selected) ||
          // add checked
          items.some(
            item =>
              defaultItem.id === item.id &&
              defaultItem.selected !== item.tableData?.checked,
          ),
      );

      prevState = prevState.filter(
        prevItem =>
          !removeItems.some(removeItem => prevItem.id === removeItem.id),
      );
      prevState.push(
        ...addItems.map(addItem => ({
          ...addItem,
          selected: !addItem.selected,
        })),
      );

      return prevState;
    });
  };
  const reset = (): void => {
    setChanged([]);
  };

  const setDefault = (items: ChangedState): void => {
    setDefaultItems(items);
  };

  return { changed, change, reset, setDefault };
};

export default useSelectionChange;
