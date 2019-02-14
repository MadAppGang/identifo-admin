import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import SearchIcon from '~/components/icons/SearchIcon';
import { throttle } from '~/utils/fn';

class UserSearch extends Component {
  constructor({ timeout }) {
    super();

    this.state = {
      query: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.dispatchChange = throttle(this.dispatchChange.bind(this), timeout);
  }

  dispatchChange() {
    this.props.onChange(this.state.query);
  }

  handleSearchChange({ target }) {
    this.setState({ query: target.value }, this.dispatchChange);
  }

  render() {
    const { query } = this.state;

    return (
      <div className="iap-users-search">
        <Input
          Icon={SearchIcon}
          value={query}
          onChange={this.handleSearchChange}
          placeholder="Search for users"
        />
      </div>
    );
  }
}

UserSearch.propTypes = {
  onChange: PropTypes.func,
  timeout: PropTypes.number,
};

UserSearch.defaultProps = {
  timeout: 500,
  onChange: () => {},
};

export default UserSearch;
