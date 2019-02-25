import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';

const LoginButton = ({ error, loading, onClick }) => (
  <Button
    error={error}
    stretch
    type="submit"
    Icon={loading ? LoadingIcon : null}
    disabled={loading}
    onClick={onClick}
  >
    Sign In
  </Button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

LoginButton.defaultProps = {
  loading: false,
  onClick: null,
  error: false,
};

export default LoginButton;
