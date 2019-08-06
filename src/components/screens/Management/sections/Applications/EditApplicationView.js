import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  alterApplication,
  deleteApplicationById,
  fetchApplicationById,
  resetApplicationError,
} from '~/modules/applications/actions';
import ActionsButton from '~/components/shared/ActionsButton';
import { createNotification } from '~/modules/notifications/actions';
import { Tabs, Tab } from '~/components/shared/Tabs';
import ApplicationGeneralSettings from './GeneralSettingsForm';
import ApplicationAuthSettings from './AuthSettingsForm';

const goBackPath = '/management/applications';

class EditApplicationView extends Component {
  constructor(props) {
    super();

    this.state = {
      tabIndex: 0,
    };

    this.availableActions = [{
      title: 'Delete Application',
      onClick: () => props.deleteApplicationById(props.id),
    }];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchApplicationById(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const doneSaving = prevProps.saving && !this.props.saving;

    if (doneSaving && !this.props.error) {
      this.goBack();
      if (this.props.application) {
        this.notifyUpdateSuccess();
      } else {
        this.notifyDeleteSuccess();
      }
    }
  }

  notifyUpdateSuccess() {
    this.props.createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Application has been updated successfully',
    });
  }

  notifyDeleteSuccess() {
    this.props.createNotification({
      type: 'success',
      title: 'Deleted',
      text: 'Application has been deleted successfully',
    });
  }

  handleSubmit(changes) {
    const { id } = this.props;

    this.props.alterApplication(id, changes);
  }

  handleCancel() {
    this.props.resetError();
    this.goBack();
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  renderTabsContent() {
    const { saving, fetching, application, error } = this.props;

    if (this.state.tabIndex === 0) {
      return (
        <ApplicationGeneralSettings
          error={error}
          loading={saving || fetching}
          application={application}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      );
    }

    if (this.state.tabIndex === 1) {
      return (
        <ApplicationAuthSettings
          application={application}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      );
    }

    return null;
  }

  render() {
    const { id, saving } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Applications
            </Link>
          </div>
          <div className="iap-management-section__title">
            Application Details

            <ActionsButton
              loading={saving}
              actions={this.availableActions}
            />
          </div>
          <p className="iap-management-section__description">
            <span className="iap-section-description__id">
              Client ID:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>
          <div className="iap-management-section__tabs">
            <Tabs
              activeTabIndex={this.state.tabIndex}
              onChange={index => this.setState({ tabIndex: index })}
            >
              <Tab title="General Settings" />
              <Tab title="Authorization Settings" />

              {this.renderTabsContent()}
            </Tabs>
          </div>
        </main>
      </section>
    );
  }
}

EditApplicationView.propTypes = {
  saving: PropTypes.bool,
  fetching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  alterApplication: PropTypes.func.isRequired,
  deleteApplicationById: PropTypes.func.isRequired,
  fetchApplicationById: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  application: PropTypes.shape(),
  error: PropTypes.instanceOf(Error),
  createNotification: PropTypes.func.isRequired,
};

EditApplicationView.defaultProps = {
  saving: false,
  fetching: false,
  application: null,
  error: null,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.appid,
  fetching: state.selectedApplication.fetching,
  saving: state.selectedApplication.saving,
  application: state.selectedApplication.application,
  error: state.selectedApplication.error,
});

const actions = {
  alterApplication,
  deleteApplicationById,
  fetchApplicationById,
  resetError: resetApplicationError,
  createNotification,
};

export default connect(mapStateToProps, actions)(EditApplicationView);
