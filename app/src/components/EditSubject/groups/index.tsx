import React from 'react';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Tabs from 'components/Tabs';

import ClassGroupsIndex from './classGroups';
import GroupsTable from './groups';

const GroupsIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.components.EditSubject);

  return (
    <Tabs
      variant="fullWidth"
      tabs={[
        { id: 0, label: t('classGroups'), panel: <ClassGroupsIndex /> },
        { id: 1, label: t('groups'), panel: <GroupsTable /> },
      ]}
    />
  );
};

export default GroupsIndex;
