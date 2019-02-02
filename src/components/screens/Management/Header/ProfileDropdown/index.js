import React, { Component } from 'react';
import DropdownIcon from '~/components/shared/icons/DropdownIcon';
import LogoutIcon from '~/components/shared/icons/LogoutIcon';
import './Profile.css';

class ProfileDropdown extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleGlobalClick = this.handleGlobalClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleGlobalClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  handleGlobalClick({ target }) {
    if (this.ref.contains(target)) {
      return;
    }

    this.close();
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;

    return (
      <div className="iap-header-profile" ref={el => this.ref = el}>
        <button
          type="button"
          className="iap-header-profile__trigger"
          onClick={this.open}
        >
          <span>Admin Panel</span>
          <DropdownIcon />
        </button>
        {open && (
          <div className="iap-profile-dropdown">
            <button
              type="button"
              className="iap-profile-dropdown__section"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileDropdown;
