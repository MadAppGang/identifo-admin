import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import {
  fetchSettings, postSettings, resetError,
} from '~/modules/database/actions';
import { createNotification } from '~/modules/notifications/actions';
import DatabasePlaceholder from './Placeholder';
import DatabaseConnectionState from './ConnectionState';

import './index.css';

class ConnectionSettings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };

    this.sectionDescription = {
      editing: 'You should select from supported database types and provide a connection for it.',
      preview: 'These values are used to create a connection to the database.',
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
        text: 'Database settings have been successfully saved',
      });
    }

    if (donePosting && this.props.error) {
      this.props.createNotification({
        type: 'failure',
        title: 'Error',
        text: 'Database settings could not be saved',
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
    const { error, fetching, posting, settings } = this.props;

    if (error && !editing) {
      return (
        <DatabasePlaceholder
          fetching={fetching}
          onTryAgainClick={this.props.fetchSettings}
        />
      );
    }

    return (
      <>
        <p className="iap-management-section__title">
          Database

          {!editing && (
            <DatabaseConnectionState loading={fetching} />
          )}
        </p>

        <div className="iap-settings-section">

          <SectionHeader
            title="Connection Settings"
            description={this.sectionDescription[editing ? 'editing' : 'preview']}
          />

          <main>
            {editing && (
              <Form
                error={error}
                posting={posting}
                settings={settings}
                onSubmit={this.handleFormSubmit}
                onCancel={this.handleEditCancel}
              />
            )}
            {!editing && (
              <>
                <Preview fetching={fetching} settings={this.props.settings} />
                <Button
                  disabled={fetching}
                  Icon={fetching ? LoadingIcon : EditIcon}
                  onClick={this.handleEditClick}
                >
                  Edit database settings
                </Button>
              </>
            )}
          </main>
        </div>
      </>
    );
  }
}

ConnectionSettings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    endpoint: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
};

ConnectionSettings.defaultProps = {
  settings: null,
  error: null,
};

const mapStateToProps = state => ({
  fetching: state.database.settings.fetching,
  posting: state.database.settings.posting,
  settings: state.database.settings.config,
  error: state.database.settings.error,
});

const actions = {
  fetchSettings,
  postSettings,
  resetError,
  createNotification,
};

export { ConnectionSettings };

export default connect(mapStateToProps, actions)(ConnectionSettings);
