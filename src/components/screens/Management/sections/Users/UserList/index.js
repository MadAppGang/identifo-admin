import React from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';
import UserHeader from './UserHeader';

import './index.css';

const datagrid = {
  icon: {
    title: '',
    width: '10%',
  },
  name: {
    title: 'Name',
    width: '30%',
  },
  email: {
    title: 'Email',
    width: '31%',
  },
  latestLogin: {
    title: 'Latest Login',
    width: '18%',
  },
  numberOfLogins: {
    title: '# of Logins',
    width: '15%',
  },
};

const UserList = (props) => {
  const { users } = props;

  return (
    <div className="iap-userlist">
      <div className="iap-datagrid">
        <UserHeader config={datagrid} />
        <main className="iap-datagrid-body">
          {users.map(user => (
            <UserRow key={user.id} data={user} config={datagrid} />
          ))}
        </main>
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()),
};

UserList.defaultProps = {
  users: [],
};

export default UserList;
