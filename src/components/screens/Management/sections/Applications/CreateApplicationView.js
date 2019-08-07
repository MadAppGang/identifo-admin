import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postApplication, resetApplicationError } from '~/modules/applications/actions';
import { createNotification } from '~/modules/notifications/actions';
import ApplicationGeneralSettings from './GeneralSettingsForm';

const goBackPath = '/management/applications';

class CreateApplicationView extends Component {
  constructor() {
    super();

    this.state = {};
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    const doneSaving = prevProps.saving && !this.props.saving;

    if (doneSaving && !this.props.error) {
      this.props.createNotification({
        type: 'success',
        title: 'Created',
        text: 'Application has been created successfully',
      });

      this.goForward(this.props.application.id);
    }

    if (doneSaving && this.props.error) {
      this.props.createNotification({
        type: 'failure',
        title: 'Error',
        text: 'Application could not be created',
      });
    }
  }

  handleCancel() {
    this.props.resetError();
    this.goBack();
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  goForward(id) {
    this.props.history.push(`/management/applications/${id}`);
  }

  render() {
    const { saving, error } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Applications
            </Link>
          </div>
          <p className="iap-management-section__title">
            Create Application
          </p>
          <p className="iap-management-section__description">
            Configure allowed callback URLs and Secrets for your application.
          </p>
        </header>
        <main>
          <ApplicationGeneralSettings
            error={error}
            loading={saving}
            excludeFields={['secret', 'active', 'tfaStatus', 'redirectUrl', 'tokenLifespan', 'allowRegistration']}
            onCancel={this.handleCancel}
            onSubmit={this.props.postApplication}
          />
        </main>
      </section>
    );
  }
}

CreateApplicationView.defaultProps = {
  saving: false,
  error: null,
};

const mapStateToProps = state => ({
  saving: state.selectedApplication.saving,
  error: state.selectedApplication.error,
  application: state.selectedApplication.application,
});

const actions = {
  postApplication,
  resetError: resetApplicationError,
  createNotification,
};

export { CreateApplicationView as NewApplicationView };

export default connect(mapStateToProps, actions)(CreateApplicationView);
