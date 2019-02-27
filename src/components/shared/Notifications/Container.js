import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from './Notification';
import {
  createNotification, removeNotification,
} from '~/modules/notifications/actions';

import './Notifications.css';

const NOTIFICATION_LIFETIME = 7000;

class NotificationContainer extends Component {
  constructor(props) {
    super(props);

    this.removeAfterDelay = this.removeAfterDelay.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.isNewNotification = this.isNewNotification.bind(this);
  }

  componentWillReceiveProps({ notifications }) {
    this.excludeExistingNotifications(notifications).forEach(this.removeAfterDelay);
  }

  isNewNotification(notification) {
    return !this.props.notifications
      .map(n => n.id)
      .includes(notification.id);
  }

  excludeExistingNotifications(list) {
    return list.filter(this.isNewNotification);
  }

  removeAfterDelay(notification) {
    setTimeout(this.removeNotification, NOTIFICATION_LIFETIME, notification);
  }

  removeNotification(notification) {
    this.props.removeNotification(notification.id);
  }

  render() {
    const list = this.props.notifications.map((notification) => {
      const props = {
        key: notification.id,
        onClick: () => this.removeNotification(notification),
        ...notification,
      };

      return <Notification {...props} />;
    });

    return (
      <div className="notification-container">
        {list}
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape()),
  createNotification: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
};

NotificationContainer.defaultProps = {
  notifications: [],
};

const mapStateToProps = state => ({
  notifications: state.notification.list,
});

const actions = {
  removeNotification,
  createNotification,
};

export default connect(mapStateToProps, actions)(NotificationContainer);
