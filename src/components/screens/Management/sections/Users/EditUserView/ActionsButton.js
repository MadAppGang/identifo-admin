import React from 'react';
import Button from '~/components/shared/Button';
import Dropdown from '~/components/shared/Dropdown';
import DropdownIcon from '~/components/icons/DropdownIcon';

const ActionsButton = () => (
  <Dropdown>
    {({ isOpen, open }) => (
      <div className="iap-users__actions-btn">
        <Button
          Icon={DropdownIcon}
          iconClassName="iap-users__actions-icon"
          onClick={open}
        >
          Actions
        </Button>
        {isOpen && (
          <div className="iap-users__actions">
            <button
              className="iap-users__actions-section"
            >
              Delete
            </button>
            <button
              className="iap-users__actions-section"
            >
              Block
            </button>
          </div>
        )}
      </div>
    )}
  </Dropdown>
);

export default ActionsButton;
