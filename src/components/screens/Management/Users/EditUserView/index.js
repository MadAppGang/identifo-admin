import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditUserForm from './Form';
import ActionsButton from '~/components/shared/ActionsButton';
import {
  fetchUserById, alterUser, deleteUserById, resetUserError,
} from '~/modules/users/actions';
import { createNotification } from '~/modules/notifications/actions';

const goBackPath = '/management/users';

class EditUserView extends Component {
  constructor(props) {
    super();

    this.state = {};

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.availableActions = [{
      title: 'Delete User',
      onClick: () => props.deleteUserById(props.id),
    }];
  }

  componentDidMount() {
    this.props.fetchUserById(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const doneSaving = prevProps.saving && !this.props.saving;

    if (doneSaving && !this.props.error) {
      if (!this.props.user) {
        this.notifyDeleteSuccess();
      } else {
        this.notifyCreationSuccess();
      }

      this.goBack();
    }

    if (doneSaving && this.props.error) {
      this.notifyCreationFailure();
    }
  }

  notifyDeleteSuccess() {
    this.props.createNotification({
      type: 'success',
      title: 'Deleted',
      text: 'User has been deleted successfully',
    });
  }

  notifyCreationSuccess() {
    this.props.createNotification({
      type: 'success',
      title: 'Updated',
      text: 'User has been updated successfully',
    });
  }

  notifyCreationFailure() {
    this.props.createNotification({
      type: 'failure',
      title: 'Error',
      text: 'User could not be updated',
    });
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  handleCancel() {
    this.props.resetError();
    this.goBack();
  }

  handleSubmit(changes) {
    this.props.alterUser(this.props.id, changes);
  }

  render() {
    const { id, fetching, saving, user, error } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Users
            </Link>
          </div>
          <div className="iap-management-section__title">
            User Details
            <ActionsButton loading={fetching} actions={this.availableActions} />
          </div>
          <p className="iap-management-section__description">
            <span className="iap-section-description__id">
              id:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>
          <EditUserForm
            user={user}
            error={error}
            loading={fetching || saving}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
        </main>
      </section>
    );
  }
}

EditUserView.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  fetchUserById: PropTypes.func.isRequired,
  alterUser: PropTypes.func.isRequired,
  deleteUserById: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  saving: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
  createNotification: PropTypes.func.isRequired,
};

EditUserView.defaultProps = {
  fetching: false,
  saving: false,
  user: null,
  error: null,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.userid,
  fetching: state.selectedUser.fetching,
  saving: state.selectedUser.saving,
  user: state.selectedUser.user,
  error: state.selectedUser.error,
});

const actions = {
  fetchUserById,
  deleteUserById,
  alterUser,
  resetError: resetUserError,
  createNotification,
};

export { EditUserView };

export default connect(mapStateToProps, actions)(EditUserView);
