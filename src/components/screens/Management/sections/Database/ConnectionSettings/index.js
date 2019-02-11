import React, { Component } from 'react';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
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
        <header>
          <span className="iap-section__title">
            Connection settings
          </span>
        </header>

        <p className="iap-section__description">
          You should select from supported database types and provide a connection for it.
        </p>

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
