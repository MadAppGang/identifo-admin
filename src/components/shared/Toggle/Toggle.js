import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Toggle = ({ label, value, onChange }) => {
  const [isOn, setIsOn] = useState(value);

  useEffect(() => {
    setIsOn(value);
  }, [value]);

  const rootClassName = classnames({
    'iap-default-toggle__body': true,
    'iap-default-toggle__body--on': isOn,
  });

  return (
    <div className="iap-default-toggle">
      {!!label && (
        <span>
          {label}
        </span>
      )}
      <button
        type="button"
        className={rootClassName}
        onClick={() => onChange(!isOn)}
      >
        <div className="iap-default-toggle__handle" />
      </button>
    </div>
  );
};

Toggle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  label: '',
  value: false,
  onChange: () => {},
};

export default Toggle;
