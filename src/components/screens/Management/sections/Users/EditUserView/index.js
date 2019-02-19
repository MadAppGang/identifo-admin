import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import EditUserForm from './Form';
import UserActionsButton from './ActionsButton';
import { fetchUserById } from '~/modules/users/actions';
import { compose } from '~/utils/fn';
import './EditUserView.css';

const goBackPath = '/management/users';

class EditUserView extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserById(this.props.id);
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  render() {
    const { id, fetching } = this.props;

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
            <UserActionsButton onDelete={console.log} />
          </div>
          <p className="iap-management-section__description">
            <span className="iap-user-details__section-id">
              id:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>
          <EditUserForm onCancel={this.goBack} onSubmit={console.log} />
        </main>
      </section>
    );
  }
};

EditUserView.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  fetchUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.userid,
  fetching: state.selectedUser.fetching,
});

const actions = {
  fetchUserById,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(EditUserView);
