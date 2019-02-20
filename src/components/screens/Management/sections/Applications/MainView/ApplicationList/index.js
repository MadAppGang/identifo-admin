import React from 'react';
import PropTypes from 'prop-types';
import ApplicationRow from './ApplicationRow';
import ApplicationHeader from './ApplicationHeader';
import Preloader from './Preloader';

import './ApplicationList.css';

const datagrid = {
  icon: {
    title: '',
    width: '16%',
  },
  type: {
    title: 'Application',
    width: '34%',
  },
  clientId: {
    title: 'Client ID',
    width: '50%',
  },
  settings: {
    title: '',
    width: '10%',
  },
};

const renderRow = application => (
  <ApplicationRow
    key={application.id}
    data={application}
    config={datagrid}
  />
);

const ApplicationList = (props) => {
  const { applications, loading } = props;

  return (
    <div className="iap-applications-list">
      <ApplicationHeader config={datagrid} />
      <main>

        {loading && (
          <Preloader />
        )}

        {!loading && applications.map(renderRow)}

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
