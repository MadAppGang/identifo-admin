import React from 'react';
import PropTypes from 'prop-types';
import useToggle from '@dprovodnikov/use-toggle';
import classnames from 'classnames';

const Toggle = ({ label, value, onChange }) => {
  const [isOn, toggle] = useToggle(value, onChange);

  const rootClassName = classnames({
    'iap-default-toggle__body': true,
    'iap-default-toggle__body--on': isOn,
  });

  return (
    <div className="iap-default-toggle">
      <button
        type="button"
        className={rootClassName}
        onClick={toggle}
      >
        <div className="iap-default-toggle__handle" />
      </button>
      <span>
        {label}
      </span>
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
