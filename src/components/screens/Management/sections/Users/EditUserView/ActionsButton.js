import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import Dropdown from '~/components/shared/Dropdown';
import DropdownIcon from '~/components/icons/DropdownIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

const UserActionsButton = props => (
  <Dropdown>
    {({ isOpen, open }) => (
      <div className="iap-users__actions-btn">
        <Button
          Icon={props.loading ? LoadingIcon : DropdownIcon}
          disabled={props.loading}
          iconClassName="iap-users__actions-icon"
          onClick={open}
        >
          Actions
        </Button>
        {isOpen && (
          <div className="iap-users__actions">
            <button
              type="button"
              className="iap-users__actions-section"
              onClick={props.onDelete}
            >
              Delete User
            </button>
          </div>
        )}
      </div>
    )}
  </Dropdown>
);

UserActionsButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

UserActionsButton.defaultProps = {
  loading: false,
};

export default UserActionsButton;
