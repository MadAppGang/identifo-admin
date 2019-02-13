import React from 'react';
import NotFoundIcon from '~/components/icons/NotFoundIcon';

const UsersNotFound = () => (
  <div className="iap-users__not-found">
    <NotFoundIcon className="iap-users__not-found-icon" />
    <p className="iap-users__not-found-text">
      No Users Found
    </p>
  </div>
);

export default UsersNotFound;
