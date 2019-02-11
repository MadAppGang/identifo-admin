import React, { Component } from 'react';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import editIcon from '~/assets/icons/edit.svg';

import './index.css';

class ConnectionSettings extends Component {
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
          title="Connection Settings"
          description="You should select from supported database types and provide a connection for it."
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
                Edit database settings
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }
}

export default ConnectionSettings;
