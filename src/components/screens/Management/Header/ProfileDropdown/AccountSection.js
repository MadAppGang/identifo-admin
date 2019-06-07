import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AccountIcon from '~/components/icons/AccountIcon';

const AccountSection = ({ history, onClick }) => {
  const handleClick = () => {
    history.push('/management/settings');
    onClick();
  };

  return (
    <button
      type="button"
      className="iap-profile-dropdown__section"
      onClick={useCallback(handleClick, [history, onClick])}
    >
      <AccountIcon />
      <span>Account</span>
    </button>
  );
};

AccountSection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onClick: PropTypes.func,
};

AccountSection.defaultProps = {
  onClick: () => {},
};

export default withRouter(AccountSection);
