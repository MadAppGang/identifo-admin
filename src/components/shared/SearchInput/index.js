import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import SearchIcon from '~/components/icons/SearchIcon';
import { throttle } from '~/utils/fn';

import './SearchInput.css';

class SearchInput extends Component {
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
      <div className="iap-search-input">
        <Input
          Icon={SearchIcon}
          value={query}
          onChange={this.handleSearchChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
  timeout: PropTypes.number,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  timeout: 500,
  placeholder: 'Search',
  onChange: () => {},
};

export default SearchInput;
