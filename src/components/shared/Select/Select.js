import React, { Children } from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'use-dropdown';
import Input from '~/components/shared/Input';

const getDisplayValue = (value, children) => {
  const child = Children
    .toArray(children)
    .find(ch => ch.props.value === value);

  return child ? child.props.title : '';
};

const Select = (props) => {
  const { children, value, disabled, placeholder, errorMessage } = props;
  const [containerRef, isOpen, open, close] = useDropdown();

  return (
    <div className="iap-db-dropdown" ref={containerRef}>
      <Input
        placeholder={placeholder}
        style={{ caretColor: 'transparent' }}
        value={getDisplayValue(value, props.children)}
        disabled={disabled}
        onFocus={open}
        errorMessage={errorMessage}
      />
      {isOpen && (
        <div className="iap-db-dropdown__options">
          {Children.map(children, (child) => {
            const extraProps = {
              onClick: () => {
                close();
                props.onChange(child.props.value);
              },
              active: value === child.props.value,
            };

            return React.cloneElement(child, extraProps);
          })}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Select.defaultProps = {
  disabled: false,
  placeholder: 'Select',
  errorMessage: '',
};

export default Select;
