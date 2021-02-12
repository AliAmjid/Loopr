import React, { useEffect } from 'react';

import GradeIcon from '@material-ui/icons/Grade';
import { useInView } from 'react-intersection-observer';

import ListItem from './ListItem';
import { NotificationsProps } from './types';

const Notification: React.FC<NotificationsProps> = props => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && props.onFetchMore) {
      props.onFetchMore();
    }
  }, [inView]);

  let primary = '';
  let secondary = '';

  switch (props.notification.type) {
    case 'POINT_CHANGED':
      primary = 'pointsChanged';
      secondary = props.notification.parameters.examName;
      break;
    default:
      break;
  }

  return (
    <ListItem
      innerRef={ref}
      icon={<GradeIcon />}
      primaryText={primary}
      secondaryText={secondary}
    />
  );
};

export default Notification;
