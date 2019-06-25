import React from 'react';
import PropTypes from 'prop-types';
import { DatagridRow } from '~/components/shared/Datagrid';
import { getInitials } from '~/utils';
import { formatDateForTable } from '~/utils/datetime';

const UserRow = ({ data, config }) => (
  <DatagridRow>
    <div style={{ width: config.icon.width }}>
      <div className="iap-datagrid-row__user-icon">
        {getInitials(data.username, data.email)}
      </div>
    </div>
    <div style={{ width: config.name.width }}>
      {data.username || '-'}
    </div>
    <div style={{ width: config.email.width }}>
      {data.email || '-'}
    </div>
    <div style={{ width: config.latest_login_time.width }}>
      {formatDateForTable(data.latest_login_time)}
    </div>
    <div style={{ width: config.num_of_logins.width }}>
      {data.num_of_logins || 0}
    </div>
  </DatagridRow>
);

UserRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    latest_login_time: PropTypes.number,
    num_of_logins: PropTypes.number,
  }).isRequired,
  config: PropTypes.shape({
    name: PropTypes.object,
    email: PropTypes.object,
    latest_login_time: PropTypes.object,
    num_of_logins: PropTypes.object,
  }).isRequired,
};

export default UserRow;
