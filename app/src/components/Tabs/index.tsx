import React, { useState } from 'react';

import { Box, Tab, Tabs as TabsPrefab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { TabsProps } from './types';

const Tabs: React.FC<TabsProps> = props => {
  const [value, setValue] = useState(props.defaultTabsId ?? 0);

  const mappedTabs = props.tabs.map(tab => (
    <Tab key={tab.id} value={tab.id} label={tab.label} />
  ));

  const mappedPanels = props.tabs.map(tab => (
    <Box width="100%" key={tab.id}>
      {tab.panel}
    </Box>
  ));

  return (
    <>
      <TabsPrefab
        value={value}
        onChange={(e, value) => setValue(value)}
        indicatorColor="primary"
        variant={props.variant || 'scrollable'}
        scrollButtons={props.variant === 'scrollable' ? 'auto' : 'off'}
      >
        {mappedTabs}
      </TabsPrefab>
      <SwipeableViews
        index={props.tabs.findIndex(t => t.id === value)}
        onChangeIndex={value => setValue(value)}
      >
        {mappedPanels}
      </SwipeableViews>
    </>
  );
};

export default Tabs;
