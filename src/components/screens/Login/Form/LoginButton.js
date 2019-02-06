import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import loadingIcon from './loading.svg';

const LoginButton = ({ loading, onClick }) => (
  <Button
    stretch
    type="submit"
    icon={loading ? loadingIcon : null}
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
