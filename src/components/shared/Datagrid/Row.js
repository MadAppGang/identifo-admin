import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DatagridRow = ({ children, header }) => (
  <div
    className={classnames({
      'iap-datagrid-row': true,
      'iap-datagrid-row--header': header,
    })}
  >
    {children}
  </div>
);

DatagridRow.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
};

DatagridRow.defaultProps = {
  header: false,
};

export default DatagridRow;
