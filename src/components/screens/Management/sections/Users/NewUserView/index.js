import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import UserForm from './UserForm';
import { postUser } from '~/modules/users/actions';
import { compose } from '~/utils/fn';

const goBackPath = '/management/users';

class NewUserView extends Component {
  constructor() {
    super();

    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saving && !this.props.saving) {
      this.goBack();
    }
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  render() {
    const { saving } = this.props;

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
            saving={saving}
            onCancel={this.goBack}
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
};

NewUserView.defaultProps = {
  saving: false,
};

const mapStateToProps = state => ({
  saving: state.users.saving,
});

const actions = {
  postUser,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(NewUserView);
