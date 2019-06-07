import React from 'react';
import PropTypes from 'prop-types';
import './Field.css';

const Field = ({ label, Icon, children }) => (
  <div className="iap-form__field">
    <span className="iap-form__label">
      {label}

      {!!Icon && (
        <Icon.type {...Icon.props} className="iap-form__label-icon" />
      )}
    </span>
    {children}
  </div>
);

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  Icon: PropTypes.element,
};

Field.defaultProps = {
  label: '',
  children: null,
  Icon: null,
};

export default Field;
