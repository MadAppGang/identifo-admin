import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import UserForm from './UserForm';

const goBackPath = '/management/users';

const NewUserView = (props) => {
  const goBack = () => props.history.push(goBackPath);

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
          Created user is going to be able to login into selected application with these credentials
        </p>
      </header>
      <main>
        <UserForm onCancel={goBack} />
      </main>
    </section>
  );
};

NewUserView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(NewUserView);
