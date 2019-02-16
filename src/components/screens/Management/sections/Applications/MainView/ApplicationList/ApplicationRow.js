import React from 'react';
import PropTypes from 'prop-types';
import { DatagridRow } from '~/components/shared/Datagrid';

const ApplicationRow = ({ data, config }) => (
  <DatagridRow key={data.id} className="iap-application-row">
    <div style={{ width: config.icon.width }} />
    <div style={{ width: config.clientId.width }}>
      <p className="iap-application-row__clientid">{data.clientId}</p>
    </div>
    <div style={{ width: config.settings.width }} />
  </DatagridRow>
);

ApplicationRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    clientId: PropTypes.string,
  }).isRequired,
  config: PropTypes.shape({
    icon: PropTypes.object,
    clientId: PropTypes.object,
    settings: PropTypes.object,
  }).isRequired,
};

export default ApplicationRow;
