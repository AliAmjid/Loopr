import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import UpdateIcon from '@material-ui/icons/Update';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

import routes from 'config/routes';

import {
  NotificationsMarkReadNotificationsUserMutation,
  NotificationsMarkReadNotificationsUserMutationVariables,
} from 'types/graphql';

import NOTIFICATIONS_MARK_READ_NOTIFICATIONS_USER_MUTATION from './mutations/markReadNotificationUser';
import ListItem from './ListItem';
import { Href, NotificationsProps } from './types';

const Notification: React.FC<NotificationsProps> = props => {
  const [markAsRead] = useMutation<
    NotificationsMarkReadNotificationsUserMutation,
    NotificationsMarkReadNotificationsUserMutationVariables
  >(NOTIFICATIONS_MARK_READ_NOTIFICATIONS_USER_MUTATION);
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (inView && props.onFetchMore) {
      props.onFetchMore();
    }
  }, [inView]);

  let primary = '-';
  let secondary = '-';
  let icon = <div />;
  let href: Href;

  switch (props.notification.type) {
    case 'NEW_POINT':
      primary = 'newPoints';
      secondary = `${props.notification.parameters.subjectName} - ${props.notification.parameters.examName}`;
      icon = <AddIcon />;
      href = routes.studentSubjects.index;
      break;
    case 'POINT_CHANGED':
      primary = 'pointChanged';
      secondary = `${props.notification.parameters.subjectName} - ${props.notification.parameters.examName}`;
      icon = <UpdateIcon />;
      href = routes.studentSubjects.index;
      break;
    default:
      break;
  }

  const clickHandler = (): void => {
    markAsRead({
      variables: { input: { id: props.notification.id } },
    }).then(() => {
      if (href) {
        if (props.onRedirect) props.onRedirect();
        router.push(href);
      }
    });
  };

  return (
    <ListItem
      innerRef={ref}
      icon={icon}
      primaryText={primary}
      secondaryText={secondary}
      viewAt={props.notification.viewAt !== null}
      onClick={clickHandler}
    />
  );
};

export default Notification;
