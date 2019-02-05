import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '~/components/shared/Input';
import Dropdown from '~/components/shared/Dropdown';

class DatabaseDropdown extends Component {
  constructor() {
    super();

    this.state = {
      options: [
        {
          title: 'MongoDB',
          value: 'mongodb',
        },
        {
          title: 'DynamoDB',
          value: 'dynamodb',
        },
      ],
    };

    this.renderDropdownOption = this.renderDropdownOption.bind(this);
  }

  getDisplayValue(value) {
    const option = this.state.options.find(o => o.value === value);
    return option ? option.title : '';
  }

  renderDropdownOption(option, onClick) {
    const { selectedOption } = this.state;
    const { selectedValue, onChange } = this.props;

    const handleClick = () => {
      onClick();
      onChange(option.value);
    };

    const isActive = selectedOption
      ? selectedValue === option.value
      : false;

    const className = classnames({
      'iap-db-dropdown__option': true,
      'iap-db-dropdown__option--active': isActive,
    });

    return (
      <button
        type="button"
        key={option.value}
        className={className}
        onClick={handleClick}
      >
        {option.title}
      </button>
    );
  }

  render() {
    const { options } = this.state;
    const { selectedValue } = this.props;

    return (
      <Dropdown>
        {({ open, close, isOpen }) => (
          <div className="iap-db-dropdown">
            <Input
              placeholder="Select database type"
              style={{ caretColor: 'transparent' }}
              value={this.getDisplayValue(selectedValue)}
              onFocus={open}
            />
            {isOpen && (
              <div className="iap-db-dropdown__options">
                {options.map(option => this.renderDropdownOption(option, close))}
              </div>
            )}
          </div>
        )}
      </Dropdown>
    );
  }
}

DatabaseDropdown.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatabaseDropdown;
