import React from 'react';
import { DatagridRow, DatagridHeader } from '~/components/shared/Datagrid';
import Toggle from '~/components/shared/Toggle';
import PhoneLoginIcon from '~/components/icons/PhoneLoginIcon.svg';
import FederatedLoginIcon from '~/components/icons/FederatedLoginIcon.svg';
import UsernameLoginIcon from '~/components/icons/UsernameLoginIcon.svg';

const datagrid = {
  icon: {
    title: '',
    width: '13%',
  },
  type: {
    title: 'Login With',
    width: '62%',
  },
  enabled: {
    title: 'Enabled',
    width: '25%',
  },
};

const LoginTypesTable = () => {
  const loginTypes = [
    {
      id: 1,
      type: 'username_and_password',
      title: 'Username and Password',
      Icon: UsernameLoginIcon,
      enabled: false,
    },
    {
      id: 2,
      type: 'phone_number',
      title: 'Phone Number',
      Icon: PhoneLoginIcon,
      enabled: false,
    },
    {
      id: 3,
      type: 'federated',
      title: 'Federated Identity',
      Icon: FederatedLoginIcon,
      enabled: false,
    },
  ];


  const renderRow = data => (
    <DatagridRow key={data.id} className="login-types-row">
      <div style={{ width: datagrid.icon.width }}>
        <div className="login-types-row__icon">
          {data.Icon && (
            <data.Icon className="login-type-icon" />
          )}
        </div>
      </div>
      <div style={{ width: datagrid.type.width }}>
        <p className="login-types-row__type">{data.title}</p>
      </div>
      <div style={{ width: datagrid.enabled.width }}>
        <div className="login-types-row__enabled">
          <Toggle value={data.enabled} onChange={() => {}} />
        </div>
      </div>
    </DatagridRow>
  );

  return (
    <div className="login-types-table">
      <DatagridHeader>
        {Object.keys(datagrid).map(key => (
          <div key={key} style={{ width: datagrid[key].width }}>
            {datagrid[key].title}
          </div>
        ))}
      </DatagridHeader>

      {loginTypes.map(renderRow)}
    </div>
  );
};

export default LoginTypesTable;
