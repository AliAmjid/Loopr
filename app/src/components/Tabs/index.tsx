import React, { useState } from 'react';

import { Box, makeStyles, Tab, Tabs as TabsPrefab } from '@material-ui/core';

import { TabsProps } from './types';

const useStyles = makeStyles({
  tabs: {
    overflow: 'hidden',
  },
});

const DefaultWrapper: React.FC = props => <>{props.children}</>;
const Tabs: React.FC<TabsProps> = props => {
  const classes = useStyles();

  const [value, setValue] = useState(props.defaultTabsId ?? 0);

  const mappedTabs = props.tabs.map(tab => (
    <Tab key={tab.id} value={tab.id} label={tab.label} />
  ));

  let Wrapper = DefaultWrapper;
  if (props.TabWrapper) {
    Wrapper = props.TabWrapper;
  }

  return (
    <>
      <TabsPrefab
        className={classes.tabs}
        classes={{
          scroller: classes.tabs,
        }}
        value={value}
        onChange={(e, value) => setValue(value)}
        indicatorColor="primary"
        variant={props.variant || 'scrollable'}
        scrollButtons={props.variant === 'scrollable' ? 'auto' : 'off'}
      >
        {mappedTabs}
      </TabsPrefab>
      <Box width="100%">
        <Wrapper>{props.tabs.find(tab => tab.id === value)?.panel}</Wrapper>
      </Box>
    </>
  );
};

export default Tabs;
