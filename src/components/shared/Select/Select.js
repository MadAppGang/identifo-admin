import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import Dropdown from '~/components/shared/Dropdown';

class Select extends Component {
  getDisplayValue(value) {
    const child = Children
      .toArray(this.props.children)
      .find(ch => ch.props.value === value);

    return child ? child.props.title : '';
  }

  render() {
    const { children, value, disabled, placeholder } = this.props;

    return (
      <Dropdown>
        {({ open, close, isOpen }) => (
          <div className="iap-db-dropdown">
            <Input
              placeholder={placeholder}
              style={{ caretColor: 'transparent' }}
              value={this.getDisplayValue(value)}
              disabled={disabled}
              onFocus={open}
            />
            {isOpen && (
              <div className="iap-db-dropdown__options">
                {Children.map(children, (child) => {
                  const extraProps = {
                    onClick: () => {
                      close();
                      this.props.onChange(child.props.value);
                    },
                    active: value === child.props.value,
                  };

                  return React.cloneElement(child, extraProps);
                })}
              </div>
            )}
          </div>
        )}
      </Dropdown>
    );
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Select.defaultProps = {
  disabled: false,
  options: [],
  placeholder: 'Select',
};

export default Select;
