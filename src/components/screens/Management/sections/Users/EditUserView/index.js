import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import EditUserForm from './Form';
import UserActionsButton from './ActionsButton';
import './EditUserView.css';

const goBackPath = '/management/users';

const EditUserView = (props) => {
  const id = props.match.params.userid;

  const goBack = () => props.history.push(goBackPath);

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
        <EditUserForm onCancel={goBack} onSubmit={console.log} />
      </main>
    </section>
  );
};

EditUserView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userid: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(EditUserView);
