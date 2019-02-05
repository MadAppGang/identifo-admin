import React from 'react';
import PropTypes from 'prop-types';
import './Field.css';

const Field = ({ label, children }) => (
  <div className="iap-form__field">
    <span className="iap-form__label">
      {label}
    </span>
    {children}
  </div>
);

Field.propTypes = {
  children: PropTypes.node,
};

Field.defaultProps = {
  children: null,
};

export default Field;
