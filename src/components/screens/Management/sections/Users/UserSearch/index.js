import React, { Component } from 'react';
import Input from '~/components/shared/Input';
import SearchIcon from '~/components/icons/SearchIcon';

class UserSearch extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange({ target }) {
    this.setState({ search: target.value });
  }

  render() {
    const { search } = this.state;

    return (
      <div className="iap-users-search">
        <Input
          Icon={SearchIcon}
          value={search}
          onChange={this.handleSearchChange}
          placeholder="Search for users"
        />
      </div>
    );
  }
}

export default UserSearch;
