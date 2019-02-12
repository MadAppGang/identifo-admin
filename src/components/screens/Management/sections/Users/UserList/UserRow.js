import React from 'react';
import PropTypes from 'prop-types';
import { DatagridRow } from '~/components/shared/Datagrid';

const getInitials = (name) => {
  // TODO: poor implementation
  const [first, last] = name.toUpperCase().split(/\s/);
  return `${first.slice(0, 1)}${last.slice(0, 1)}`;
};

const UserRow = ({ data, config }) => (
  <DatagridRow>
    <div style={{ width: config.icon.width }}>
      <div className="iap-datagrid-row__user-icon">
        {getInitials(data.name)}
      </div>
    </div>
    <div style={{ width: config.name.width }}>
      {data.name}
    </div>
    <div style={{ width: config.email.width }}>
      {data.email}
    </div>
    <div style={{ width: config.latestLogin.width }}>
      {data.latestLogin}
    </div>
    <div style={{ width: config.numberOfLogins.width }}>
      {data.numberOfLogins}
    </div>
  </DatagridRow>
);

UserRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    latestLogin: PropTypes.string,
    numberOfLogins: PropTypes.number,
  }).isRequired,
  config: PropTypes.shape({
    name: PropTypes.object,
    email: PropTypes.object,
    latestLogin: PropTypes.object,
    numberOfLogins: PropTypes.object,
  }).isRequired,
};

export default UserRow;
