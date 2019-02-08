import React from 'react';
import PropTypes from 'prop-types';
import ToggleView from './View';
import ToggleBehaviour from './Behaviour';

const Toggle = props => (
  <ToggleBehaviour onChange={props.onChange}>
    {behavourProps => <ToggleView {...behavourProps} {...props} />}
  </ToggleBehaviour>
);

Toggle.propTypes = {
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  onChange: () => {},
};

export default Toggle;
