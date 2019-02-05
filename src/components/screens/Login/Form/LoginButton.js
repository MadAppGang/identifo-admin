import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import loadingIcon from './loading.svg';

const LoginButton = ({ loading, onClick }) => (
  <Button
    stretch
    icon={loading ? loadingIcon : null}
    disabled={loading}
    onClick={onClick}
  >
    Sign In
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
