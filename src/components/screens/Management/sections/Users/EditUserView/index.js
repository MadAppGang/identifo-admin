import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './EditUserView.css';

const goBackPath = '/management/users';

const EditUserView = (props) => {
  const id = props.match.params.userid;

  return (
    <section className="iap-management-section">
      <header>
        <div>
          <Link to={goBackPath} className="iap-management-section__back">
            ← &nbsp;Users
          </Link>
        </div>
        <p className="iap-management-section__title">
          User Details
        </p>
        <p className="iap-management-section__description">
          <span className="iap-user-details__section-id">
            id:&nbsp;
            {id}
          </span>
        </p>
      </header>
      <main>
        {null}
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
};

export default withRouter(EditUserView);
