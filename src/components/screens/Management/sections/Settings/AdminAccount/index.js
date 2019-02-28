import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import {
  fetchAccountSettings, postAccountSettings, resetAccountError,
} from '~/modules/account/actions';
import { createNotification } from '~/modules/notifications/actions';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SettingsPlaceholder from './Placeholder';

class AdminAccountSettings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSettings();
  }

  componentDidUpdate(prevProps) {
    const donePosting = prevProps.posting && !this.props.posting;

    if (donePosting && !this.props.error) {
      this.handleEditCancel();
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

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleEditCancel() {
    this.props.resetError();
    this.setState({ editing: false });
  }

  handleFormSubmit(settings) {
    this.props.postSettings(settings);
  }

  render() {
    const { editing } = this.state;
    const { posting, fetching, settings, error } = this.props;

    if (error && !editing) {
      return (
        <SettingsPlaceholder
          fetching={fetching}
          onTryAgainClick={this.props.fetchSettings}
        />
      );
    }

    return (
      <>
        <p className="iap-management-section__title">
          Account Settings
        </p>

        <div className="iap-settings-section">
          <SectionHeader
            title="Admin Account"
            description="These are credentials used to login into admin panel"
          />

          <main>
            {editing && (
              <Form
                error={error}
                posting={posting}
                settings={settings}
                onCancel={this.handleEditCancel}
                onSubmit={this.handleFormSubmit}
              />
            )}
            {!editing && (
              <>
                <Preview fetching={fetching} settings={settings} />
                <Button
                  disabled={fetching}
                  Icon={fetching ? LoadingIcon : EditIcon}
                  onClick={this.handleEditClick}
                >
                  Edit admin account
                </Button>
              </>
            )}
          </main>
        </div>
      </>
    );
  }
}

AdminAccountSettings.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
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
  resetError: resetAccountError,
  createNotification,
};

export default connect(mapStateToProps, actions)(AdminAccountSettings);
