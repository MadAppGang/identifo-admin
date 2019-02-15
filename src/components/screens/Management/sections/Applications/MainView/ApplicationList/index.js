import React from 'react';
import PropTypes from 'prop-types';
import { DatagridHeader, DatagridRow } from '~/components/shared/Datagrid';

import './ApplicationList.css';

const datagrid = {
  icon: {
    title: 'Type',
    width: '36%',
  },
  clientId: {
    title: 'Client ID',
    width: '50%',
  },
  settings: {
    title: '',
    width: '14%',
  },
};

const ApplicationList = (props) => {
  const { applications, loading } = props;

  return (
    <div className="iap-applications-list">
      <DatagridHeader>
        {Object.keys(datagrid).map(key => (
          <div key={key} style={{ width: datagrid[key].width }}>
            {datagrid[key].title}
          </div>
        ))}
      </DatagridHeader>
      <main>
        {!loading && applications.map(application => (
          <DatagridRow key={application.id} className="iap-application-row">
            <div style={{ width: datagrid.icon.width }} />
            <div style={{ width: datagrid.clientId.width }}>
              <p className="iap-application-row__clientid">{application.clientId}</p>
            </div>
            <div style={{ width: datagrid.settings.width }} />
          </DatagridRow>
        ))}
      </main>
    </div>
  );
};

ApplicationList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
};

ApplicationList.defaultProps = {
  loading: false,
};

export default ApplicationList;
