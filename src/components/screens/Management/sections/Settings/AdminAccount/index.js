import React, { Component } from 'react';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import editIcon from '~/assets/icons/edit.svg';

class AdminAccountSettings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleEditCancel() {
    this.setState({ editing: false });
  }

  render() {
    const { editing } = this.state;

    return (
      <div className="iap-settings-section">
        <SectionHeader
          title="Admin Account"
          description="These are credentials used to login into admin panel"
        />

        <main>
          {editing && <Form onCancel={this.handleEditCancel} />}
          {!editing && (
            <>
              <Preview />
              <Button
                icon={editIcon}
                onClick={this.handleEditClick}
              >
                Edit admin account
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }
}

export default AdminAccountSettings;
