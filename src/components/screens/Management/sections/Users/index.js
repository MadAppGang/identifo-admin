import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UsersPlaceholder from './Placeholder';
import UserList from './UserList';
import UserSearch from './UserSearch';
import Button from '~/components/shared/Button';
import { fetchUsers } from '~/modules/users/actions';
import addIcon from '~/assets/icons/plus.svg';

class UsersSection extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, fetching } = this.props;

    if (!users.length && !fetching) {
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

        <UserList loading={fetching} users={users} />
      </section>
    );
  }
}

UsersSection.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    latestLogin: PropTypes.string,
    numberOfLogins: PropTypes.number,
  })),
};

UsersSection.defaultProps = {
  users: [],
};

const mapStateToProps = state => ({
  fetching: state.users.fetching,
  users: state.users.list,
});

const actions = {
  fetchUsers,
};

export default connect(mapStateToProps, actions)(UsersSection);
