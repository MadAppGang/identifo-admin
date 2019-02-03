import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '~/components/icons/LoadingIcon';
import Button from '~/components/shared/Button';

const LoginButton = ({ loading, onClick }) => (
  <Button
    stretch
    disabled={loading}
    onClick={onClick}
  >
    {loading && <LoadingIcon />}
    <span>Sign In</span>
  </Button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginButton.defaultProps = {
  loading: false,
};

export default LoginButton;
