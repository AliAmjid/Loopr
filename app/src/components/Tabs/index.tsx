import React, { useState } from 'react';

import { Box, Tab, Tabs as TabsPrefab, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { TabsProps } from './types';

const Tabs: React.FC<TabsProps> = props => {
  const theme = useTheme();
  const [value, setValue] = useState(
    props.defaultTabsId ?? (props.tabs[0]?.id || 0),
  );

  const mappedTabs = props.tabs.map(tab => (
    <Tab key={`tab${tab.id}`} value={tab.id} label={tab.label} />
  ));

  const mappedPanels = props.tabs.map(tab => (
    <Box width="100%" key={`panel${tab.id}`}>
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
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={value => setValue(value)}
      >
        {mappedPanels}
      </SwipeableViews>
    </>
  );
};

export default Tabs;
