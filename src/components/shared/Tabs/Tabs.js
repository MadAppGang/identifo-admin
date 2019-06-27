import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const Tabs = ({ activeTabIndex, onChange, children }) => {
  const tabContent = [...children].pop();
  const tabs = children.slice(0, -1);

  if (tabContent.type === Tab) {
    throw Error('Last child should be tab content');
  }

  return (
    <>
      <div className="iap-tabs-tablist">
        {React.Children.map(tabs, (child, index) => {
          return React.cloneElement(child, {
            key: child.props.title,
            isActive: activeTabIndex === index,
            onClick: () => onChange(index),
          });
        })}
      </div>
      {tabContent}
    </>
  );
};

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;
