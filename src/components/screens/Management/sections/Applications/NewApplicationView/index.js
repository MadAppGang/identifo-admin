import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  postApplication,
  resetApplicationError,
} from '~/modules/applications/actions';
import { createNotification } from '~/modules/notifications/actions';
import ApplicationForm from '../shared/ApplicationForm';
import { compose } from '~/utils/fn';

const goBackPath = '/management/applications';

class NewApplicationView extends Component {
  constructor() {
    super();

    this.state = {};
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    const doneSaving = prevProps.saving && !this.props.saving;

    if (doneSaving && !this.props.error) {
      this.goBack();
      this.props.createNotification({
        type: 'success',
        title: 'Created',
        text: 'Application has been created successfully',
      });
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
            Configure the allowed Callback URLs and Secrets for your Application.
          </p>
        </header>
        <main>
          <ApplicationForm
            error={error}
            loading={saving}
            onCancel={this.handleCancel}
            onSubmit={this.props.postApplication}
          />
        </main>
      </section>
    );
  }
}

NewApplicationView.propTypes = {
  saving: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  postApplication: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};

NewApplicationView.defaultProps = {
  saving: false,
  error: null,
};

const mapStateToProps = state => ({
  saving: state.selectedApplication.saving,
  error: state.selectedApplication.error,
});

const actions = {
  postApplication,
  resetError: resetApplicationError,
  createNotification,
};

export { NewApplicationView };

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(NewApplicationView);
