import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import UserForm from './UserForm';
import { postUser, resetUserError } from '~/modules/users/actions';
import { createNotification } from '~/modules/notifications/actions';

const goBackPath = '/management/users';

class NewUserView extends Component {
  constructor() {
    super();

    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    const doneSaving = prevProps.saving && !this.props.saving;

    if (doneSaving && !this.props.error) {
      this.notifyCreationSuccess();
      this.goBack();
    }

    if (doneSaving && this.props.error) {
      this.notifyCreationFailure();
    }
  }

  notifyCreationSuccess() {
    this.props.createNotification({
      type: 'success',
      title: 'Created',
      text: 'User has been created successfully',
    });
  }

  notifyCreationFailure() {
    this.props.createNotification({
      type: 'failure',
      title: 'Error',
      text: 'User could not be created',
    });
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  handleCancel() {
    this.props.resetError();
    this.goBack();
  }

  render() {
    const { saving, error } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Users
            </Link>
          </div>
          <p className="iap-management-section__title">
            Create User
          </p>
          <p className="iap-management-section__description">
            Created user is going to be able to log in using these credentials
          </p>
        </header>
        <main>
          <UserForm
            error={error}
            saving={saving}
            onCancel={this.handleCancel}
            onSubmit={this.props.postUser}
          />
        </main>
      </section>
    );
  }
}

NewUserView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  postUser: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  resetError: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

NewUserView.defaultProps = {
  saving: false,
  error: null,
};

const mapStateToProps = state => ({
  saving: state.selectedUser.saving,
  error: state.selectedUser.error,
});

const actions = {
  postUser,
  resetError: resetUserError,
  createNotification,
};

export { NewUserView };

export default withRouter(connect(mapStateToProps, actions)(NewUserView));
