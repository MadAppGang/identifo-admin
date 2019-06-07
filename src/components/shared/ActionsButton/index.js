import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'use-dropdown';
import Button from '~/components/shared/Button';
import DropdownIcon from '~/components/icons/DropdownIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

import './ActionsButton.css';

const ActionsButton = (props) => {
  const [containerRef, isOpen, open] = useDropdown();

  return (
    <div className="iap-actions-btn" ref={containerRef}>
      <Button
        Icon={props.loading ? LoadingIcon : DropdownIcon}
        disabled={props.loading}
        iconClassName="iap-actions-btn__icon"
        onClick={open}
      >
        {props.text}
      </Button>
      {isOpen && (
        <div className="iap-actions-btn__actions">
          {props.actions.map((action) => {
            return (
              <button
                key={action.title}
                type="button"
                className="iap-actions-btn__action"
                onClick={action.onClick}
              >
                {action.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

ActionsButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  loading: PropTypes.bool,
  text: PropTypes.string,
};

ActionsButton.defaultProps = {
  loading: false,
  text: 'Actions',
};

export default ActionsButton;
