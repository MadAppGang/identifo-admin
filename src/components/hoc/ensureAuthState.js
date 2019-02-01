import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const SIGNED_IN = true;
const SIGNED_OUT = false;

const ensureAuthState = (expectedValue, Component, redirectPath) => {
  const ConnectedComponent = ({ authenticated, ...props }) => {
    if (expectedValue !== authenticated) {
      if (expectedValue === SIGNED_IN) {
        const to = {
          pathname: redirectPath,
          state: {
            path: props.location.pathname,
          },
        };

        return <Redirect to={to} />;
      }

      const redirectState = props.location.state;

      if (redirectState && redirectState.path) {
        return <Redirect to={redirectState.path} />;
      }

      return <Redirect to={redirectPath} />;
    }

    return <Component {...props} />;
  };

  ConnectedComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }).isRequired,
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return withRouter(connect(mapStateToProps)(ConnectedComponent));
};

export {
  SIGNED_IN, SIGNED_OUT,
};

export default ensureAuthState;
