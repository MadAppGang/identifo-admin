import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '~/modules/auth/actions';
import LogoutIcon from '~/components/shared/icons/LogoutIcon';

const LogoutSection = (props) => {
  return (
    <button
      type="button"
      className="iap-profile-dropdown__section"
      onClick={props.logout}
    >
      <LogoutIcon />
      <span>Logout</span>
    </button>
  );
};

LogoutSection.propTypes = {
  logout: PropTypes.func.isRequired,
};

export { LogoutSection };

export default connect(null, { logout })(LogoutSection);
