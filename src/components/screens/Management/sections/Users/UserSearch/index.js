import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { disabled } = this.props;

    return (
      <div className="iap-users-search">
        <Input
          Icon={SearchIcon}
          value={search}
          onChange={this.handleSearchChange}
          placeholder="Search for users"
          disabled={disabled}
        />
      </div>
    );
  }
}

UserSearch.propTypes = {
  disabled: PropTypes.bool,
};

UserSearch.defaultProps = {
  disabled: false,
};

export default UserSearch;
