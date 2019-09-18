import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import * as actions from '~/modules/notifications/actions';
import usePrevious from '~/hooks/usePrevious';

import './Notifications.css';

const NOTIFICATION_LIFETIME = 700000;

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(s => s.notifications.list);
  const previousNotifications = usePrevious(notifications);

  const isNewNotification = (notification) => {
    return !previousNotifications.map(n => n.id).includes(notification.id);
  };

  const excludeExistingNotifications = (list) => {
    return list.filter(isNewNotification);
  };

  const removeNotification = (notification) => {
    dispatch(actions.removeNotification(notification.id));
  };

  const removeAfterDelay = (notification) => {
    setTimeout(removeNotification, NOTIFICATION_LIFETIME, notification);
  };

  useEffect(() => {
    excludeExistingNotifications(notifications).forEach(removeAfterDelay);
  }, [notifications]);

  return (
    <div className="iap-notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClick={() => removeNotification(notification)}
        />
      ))}
    </div>
  );
};

NotificationContainer.defaultProps = {
  notifications: [],
};

export default NotificationContainer;
