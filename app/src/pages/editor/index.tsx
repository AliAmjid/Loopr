import React, { useState } from 'react';

import { Tab, Tabs } from '@material-ui/core';

import TestIndex from './test';
import { Schema } from './types';

const EditorIndex = (): JSX.Element => {
  const [tab, changeTab] = useState(0);

  const [schema, changeSchema] = useState<Schema>({ testColumns: [] });

  const addClickHandler = (): void => {
    changeSchema(s => ({
      ...s,
      testColumns: [
        ...s.testColumns,
        { id: 1, name: 'novy', label: 'Nový sloupec', code: '' },
      ],
    }));
  };

  return (
    <>
      <Tabs value={tab} onChange={(ef, value) => changeTab(value)}>
        <Tab label="Index" />
      </Tabs>
      {tab === 0 && (
        <TestIndex
          testColumns={schema.testColumns}
          onAddClick={addClickHandler}
        />
      )}
    </>
  );
};

export default EditorIndex;
