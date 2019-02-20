import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import EditUserForm from './Form';
import UserActionsButton from './ActionsButton';
import { fetchUserById, alterUser, deleteUserById } from '~/modules/users/actions';
import { compose } from '~/utils/fn';
import './EditUserView.css';

const goBackPath = '/management/users';

class EditUserView extends Component {
  constructor() {
    super();

    this.state = {};

    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserById(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saving && !this.props.saving) {
      this.goBack();
    }
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  handleSubmit(changes) {
    this.props.alterUser(this.props.id, changes);
  }

  handleDelete() {
    this.props.deleteUserById(this.props.id);
  }

  render() {
    const { id, fetching, saving, user } = this.props;

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
            <UserActionsButton loading={fetching} onDelete={this.handleDelete} />
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
            loading={fetching || saving}
            onCancel={this.goBack}
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
  fetching: PropTypes.bool,
  saving: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

EditUserView.defaultProps = {
  fetching: false,
  saving: false,
  user: null,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.userid,
  fetching: state.selectedUser.fetching,
  saving: state.selectedUser.saving,
  user: state.selectedUser.user,
});

const actions = {
  fetchUserById,
  deleteUserById,
  alterUser,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(EditUserView);
