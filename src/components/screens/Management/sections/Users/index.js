import React, { Component } from 'react';
import UsersPlaceholder from './Placeholder';
import UserList from './UserList';

class UsersSection extends Component {
  componendDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;

    if (!users || !users.length) {
      return (
        <section className="iap-management-section">
          <UsersPlaceholder />
        </section>
      );
    }

    return (
      <section className="iap-management-section">
        <p className="iap-management-section__title">
          Users
        </p>

        <UserList users={users} />
      </section>
    );
  }
}

UsersSection.defaultProps = {
  users: [
    {
      id: '1',
      name: 'Denys Provodnikov',
      email: 'dp@madappgang.com',
      latestLogin: 'Never',
      numberOfLogins: 0,
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      latestLogin: 'Yesterday',
      numberOfLogins: 3,
    },
    {
      id: '3',
      name: 'Falangus Minelly',
      email: 'angus.fm@gmail.com',
      latestLogin: '2 hours ago',
      numberOfLogins: 14,
    },
  ],
  fetchUsers: () => {},
};

export default UsersSection;
