import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountForm from './AdminAccountForm';
import { fetchAccountSettings, postAccountSettings } from '~/modules/account/actions';
import { createNotification } from '~/modules/notifications/actions';
import SettingsPlaceholder from './Placeholder';

class AdminAccountSettings extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSettings();
  }

  componentDidUpdate(prevProps) {
    const donePosting = prevProps.posting && !this.props.posting;

    if (donePosting && !this.props.error) {
      this.props.createNotification({
        type: 'success',
        title: 'Saved',
        text: 'Account settings have been successfully saved',
      });
    }

    if (donePosting && this.props.error) {
      this.props.createNotification({
        type: 'failure',
        title: 'Error',
        text: 'Account settings could not be saved',
      });
    }
  }

  handleFormSubmit(settings) {
    this.props.postSettings(settings);
  }

  render() {
    const { posting, fetching, settings, error } = this.props;

    if (error) {
      return (
        <SettingsPlaceholder
          fetching={fetching}
          onTryAgainClick={this.props.fetchSettings}
        />
      );
    }

    return (
      <AccountForm
        error={error}
        posting={posting}
        settings={settings}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

AdminAccountSettings.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    email: PropTypes.string,
  }),
  createNotification: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};

AdminAccountSettings.defaultProps = {
  settings: null,
  error: null,
};

const mapStateToProps = state => ({
  posting: state.account.posting,
  fetching: state.account.fetching,
  settings: state.account.settings,
  error: state.account.error,
});

const actions = {
  fetchSettings: fetchAccountSettings,
  postSettings: postAccountSettings,
  createNotification,
};

export default connect(mapStateToProps, actions)(AdminAccountSettings);
