import React, { Component } from 'react';
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
        {
          title: 'BoltDB',
          value: 'bolddb',
        },
      ],
      selectedOption: null,
    };

    this.renderDropdownOption = this.renderDropdownOption.bind(this);
  }

  selectOption(option) {
    this.setState({ selectedOption: option });
  }

  renderDropdownOption(option, onClick) {
    const { selectedOption } = this.state;

    const handleClick = () => {
      this.selectOption(option);
      onClick();
    };

    const isActive = selectedOption
      ? selectedOption.value === option.value
      : false;

    const className = classnames({
      'iap-db-dropdown__option': true,
      'iap-db-dropdown__option--active': isActive,
    });

    return (
      <button
        key={option.value}
        type="button"
        className={className}
        onClick={handleClick}
      >
        {option.title}
      </button>
    );
  }

  render() {
    const { options, selectedOption } = this.state;

    return (
      <Dropdown>
        {({ open, close, isOpen }) => (
          <div className="iap-db-dropdown">
            <Input
              placeholder="Select database type"
              style={{ caretColor: 'transparent' }}
              value={selectedOption ? selectedOption.title : ''}
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

export default DatabaseDropdown;
