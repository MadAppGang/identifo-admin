import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoadingIcon from '~/components/icons/LoadingIcon';

const Toggle = ({ label, value, onChange }) => {
  const [isOn, setIsOn] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsOn(value);

    if (loading) {
      setLoading(false);
    }
  }, [value]);

  const handleToggle = () => {
    onChange(!isOn);
    setLoading(true);
  };

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
        onClick={handleToggle}
      >
        <div className="iap-default-toggle__handle">
          {loading && (
            <LoadingIcon className="iap-default-toggle__handle-icon" />
          )}
        </div>
      </button>
    </div>
  );
};

Toggle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  label: '',
  value: false,
  loading: false,
  onChange: () => {},
};

export default Toggle;
