import React from 'react';
import { Link } from 'react-router-dom';

const NewUserView = () => {
  return (
    <section className="iap-management-section">
      <div>
        <Link to="/management/users" className="iap-management-section__back">
          ← &nbsp;Users
        </Link>
      </div>
      <p className="iap-management-section__title">
        Create User
      </p>
    </section>
  );
};

export default NewUserView;
