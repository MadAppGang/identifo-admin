import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tab = ({ isActive, title, onClick }) => {
  const className = classnames('iap-tabs-tab', {
    'iap-tabs-tab--active': isActive,
  });

  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  isActive: false,
};

export default Tab;
