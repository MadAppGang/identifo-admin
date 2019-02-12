import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersPlaceholder from './Placeholder';
import UserList from './UserList';
import UserSearch from './UserSearch';
import Button from '~/components/shared/Button';
import addIcon from '~/assets/icons/plus.svg';

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
          <Button icon={addIcon}>
            Add user
          </Button>
        </p>

        <p className="iap-management-section__description">
          Look for users, edit, delete them and add new ones.
        </p>

        <UserSearch />

        <UserList users={users} />
      </section>
    );
  }
}

UsersSection.propTypes = {
  fetchUsers: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    latestLogin: PropTypes.string,
    numberOfLogins: PropTypes.number,
  })),
};

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
