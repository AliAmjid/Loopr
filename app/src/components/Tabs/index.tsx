import React, { useState } from 'react';

import {
  Box,
  makeStyles,
  Tab,
  Tabs as TabsPrefab,
  Theme,
} from '@material-ui/core';

import { TabsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  tabsRoot: {
    height: 'auto',
  },
  selectedTabRoot: {
    color: theme.palette.primary.main,
  },
  tabRoot: {
    height: 'auto',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const DefaultWrapper: React.FC = props => <>{props.children}</>;
const Tabs: React.FC<TabsProps> = props => {
  const classes = useStyles();

  const [value, setValue] = useState(props.defaultTabsId ?? 0);

  const mappedTabs = props.tabs
    .filter(tab => !tab.hidden)
    .map(tab => (
      <Tab
        classes={{
          root: `${classes.tabRoot} ${
            value === tab.id ? classes.selectedTabRoot : ''
          }`,
        }}
        key={tab.id}
        value={tab.id}
        label={tab.label}
      />
    ));

  let Wrapper = DefaultWrapper;
  if (props.TabWrapper) {
    Wrapper = props.TabWrapper;
  }

  return (
    <>
      <TabsPrefab
        classes={{
          root: classes.tabsRoot,
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
