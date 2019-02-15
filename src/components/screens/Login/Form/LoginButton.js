import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';

const LoginButton = ({ loading, onClick }) => (
  <Button
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
};

LoginButton.defaultProps = {
  loading: false,
  onClick: null,
};

export default LoginButton;
